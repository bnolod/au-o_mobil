import {
  HttpError,
  HttpMethod,
  LoginRequest,
  RegisterRequest,
  TokenResponse,
} from '@/constants/types';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { deleteUser, saveUser } from './functions';
import { eventEmitter } from './events';
import { imageUpload } from './ApiCalls/ImageApiCalls';
import { User } from './entity/User';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_AXIOS_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: function (_) {
    return true;
  },
});

export default apiClient;

export const login = async (request: LoginRequest): Promise<string | null> => {
  try {
    const response = await apiClient.post<string>('auth/login', request);
    return response.data;
  } catch (error: unknown) {
    return null;
  }
};
export async function logout() {
  await apiClient.get('auth/logout', {
    withCredentials: true
  });
  await deleteUser();

  eventEmitter.emit('triggerLogout');
}

export async function apiFetch<T>(
  endpoint: string,
  method: HttpMethod = 'GET',
  requiresAuth: boolean = true,
  body?: Record<string, any>
): Promise<{ data: T | null; status: number } | null> {
  try {
    const config: AxiosRequestConfig = {
      method,
      url: endpoint,
      data: body || undefined,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: requiresAuth,
    };

    const res = await apiClient.request<T>(config);
    console.log(res.status);
    if (res.status === 403 && requiresAuth) {
      await logout();
    }
    return { data: res.data, status: res.status };
  } catch (error: unknown) {
    return null;
  }
}

export async function handleRegister(request: RegisterRequest): Promise<string> {
  try {
    const response = await apiFetch<TokenResponse>('auth/register', 'POST', false, request);
    if (response!.data!.token) {
      return response!.data!.token;
    }
    return Promise.reject();
  } catch (error: unknown) {
    throw new HttpError(500, 'No token in response');
  }
}

export async function handleLogin(request: LoginRequest): Promise<string> {
  const response = await apiFetch<TokenResponse>('auth/login', 'POST', false, request);

  return response!.data!.token;
}


export async function updateProfilePicture(imageForm: FormData) {
  const image = await imageUpload(imageForm);
  if (image) {
    const req = await apiFetch<User>('users/user/update', 'PUT', true, {
      profileImg: image.url
    })
    if (req && req.data) {
      await saveUser(req.data);
      return true;
    }
  }
  return false;
}

