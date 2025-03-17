import { HttpError, HttpMethod, LoginRequest, RegisterRequest, TokenResponse } from '@/constants/types';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { deleteUser, saveUser } from './functions';
import { eventEmitter } from './events';
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
    // const token = await SecureStore.getItemAsync('jwtToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // } else config.headers.Authorization = null;
    return config;
  },
  (error: unknown) => {
    return Promise.reject(new HttpError(500, (error as Error).message));
  }
);

export default apiClient;
/**
 * 
 * @param request Bejelentkezési adatok
 * @returns Promise<string> token
 */
export const login = async (request: LoginRequest): Promise<string | null> => {
  try {
    const response = await apiClient.post<string>('auth/login', request);
    // if (response) {
    await SecureStore.setItemAsync('jwtToken', response.data);
    await validateToken(response.data, '/login');
    // }
    return response.data;
  } catch (error: unknown) {
    return null;
  }
};
/**
 *  Kitörli a helyileg tárolt felhasználói adatokat, elkezdi a kijelentkeztetési folyamatot
 */
export async function logout() {
  await SecureStore.deleteItemAsync('jwtToken');
  await deleteUser();

  eventEmitter.emit('triggerLogout');
}
/**
 * 
 * @param token Hozzáférési token
 * @param path Jelenlegi útvonal
 * @returns new token
 */
export async function validateToken(token: string, path: string) {
  const validToken = await apiFetch<string>('auth/authenticate', 'POST', true, {
    token,
  });
  console.log('token validation');

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
/**
 * @param endpoint Lekérdezés végpontja
 * @param method HTTP-metódus kiválasztása
 * @param requiresAuth Authentikációs érvényesítők küldése
 * @param body Lekérdezés törzse
 * @returns Promise<{ data: T | null; status: number } | null>
 */
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
      credentials: requiresAuth ? 'include' : 'omit',
      // withCredentials: true,
      data: body || undefined,
      headers: {
        'Content-Type': 'application/json',
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
/**
 * Regisztráció kezelése
 * @param request Regisztrációs adatok
 * @returns Promise<string> token
 */
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

/**
 *  Bejelentkezés kezelése
 * @param request Bejelentkezési adatok
 * @returns Promise<string> token
 */
export async function handleLogin(request: LoginRequest): Promise<string> {
  const response = await apiFetch<TokenResponse>('auth/login', 'POST', false, request);

  return response!.data!.token;
}
/**
 * 
 * @param imageForm Kép űrlapja
 * @returns Promise<boolean>
 */
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
/**
 *  Keresési metódus felhasználókkal
 * @param query Keresési string
 * @returns Szűrt felhasználói lista
 */
export async function searchUsers(query: string) {
  const req = await fetch(`${apiClient.defaults.baseURL}/users/search?search=${query}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
  const res = await req.json();
  return res;
}
/**
 *  Keresési metódus csoportokkal
 * @param query Keresési string
 * @returns Szűrt felhasználói lista
 */

export async function searchGroups(query: string) {
  const req = await fetch(`${apiClient.defaults.baseURL}/groups/search?search=${query}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
  const res = await req.json();
  return res;
}
