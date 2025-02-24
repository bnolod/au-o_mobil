import {
  HttpError,
  HttpMethod,
  ImageStoreRequest,
  ImageUploadResponse,
  LoginRequest,
  RegisterRequest,
  TokenResponse,
} from '@/constants/types';
import axios, { AxiosInstance } from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { deleteUser, saveUser } from './functions';
import { eventEmitter } from './events';
import { Feed } from './entity/Feed';
import { Reply } from './entity/Reply';
import { Group } from './entity/Group';
import { imageUpload } from './ApiCalls/ImageApiCalls';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_AXIOS_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: function (_) {
    return true;
  },
});
apiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else config.headers.Authorization = null;
    return config;
  },
  (error: unknown) => {
    return Promise.reject(new HttpError(500, (error as Error).message));
  }
);

export default apiClient;

export const login = async (request: LoginRequest): Promise<string | null> => {
  try {
    const response = await apiClient.post<string>('auth/login', request);
    if (response) {
      await SecureStore.setItemAsync('jwtToken', response.data);
    }
    return response.data;
  } catch (error: unknown) {
    return null;
  }
};
export async function logout() {
  await SecureStore.deleteItemAsync('jwtToken');
  await deleteUser();

  eventEmitter.emit('triggerLogout');
}

export async function validateToken(token: string, path: string) {
  const validToken = await apiFetch<string>('auth/authenticate', 'POST', true, {
    token,
  });

  if (!validToken?.data) {
    if (path === '/onboarding' || path === '/login' || path === '/register') {
      await logout();
      router.replace('/(auth)/login');
    }
  } else {
    SecureStore.setItemAsync('jwtToken', validToken.data!);
    return validToken.data;
  }
  return validToken?.data;
}

export async function apiFetch<T>(
  endpoint: string,
  method: HttpMethod = 'GET',
  requiresAuth: boolean = true,
  body?: Record<string, any>
): Promise<{ data: T | null; status: number } | null> {
  try {
    const config = {
      method,
      url: endpoint,
      data: body || undefined,
      headers: {
        'Content-Type': 'application/json',
        Authorization: requiresAuth && `Bearer ${await SecureStore.getItemAsync('jwtToken')}`,
      },
    };

    const res = await apiClient.request<T>(config);
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
    const token = await SecureStore.getItemAsync('jwtToken');
    const req = await fetch(`${apiClient.defaults.baseURL}/users/user/update`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'PUT',
      body: JSON.stringify({
        profileImg: image.url,
      }),
    });
    const res = await req.json();
    await saveUser(res);
    return true;
  }

  return false;
}
export async function updateBio(bio: string) {
  const req = await apiFetch<null>('users/user/update', 'PUT', true, {
    bio,
  });
  if (req && req.status === 200) {
    return true;
  }
  return false;
}
export async function updateNickname(nickname: string) {
  const req = await apiFetch<null>('users/user/update', 'PUT', true, {
    nickname,
  });
  if (req && req.status === 200) {
    return true;
  }
  return false;
}
// export async function loadFeed(index: number, timestamp: string) {
//   const req = await apiFetch<Feed>(`posts/feed?page=${index}&time=${timestamp}`, 'GET', true);
//   if (req && req.status === 200) {
//     return req.data;
//   }
//   return null;
// }
