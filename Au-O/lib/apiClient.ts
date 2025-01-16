import {
  HttpError,
  HttpMethod,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "@/constants/types";
import axios, { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";
import * as AuthSession from "expo-auth-session";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_AXIOS_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(new HttpError(500, (error as Error).message));
  }
);
export default apiClient;

export const login = async (request: LoginRequest): Promise<string | null> => {
  try {
    const response = await apiClient.post<string>("auth/login", request);
    if (response) {
      await SecureStore.setItemAsync("jwtToken", response.data);
    }
    return response.data;
  } catch (error: unknown) {
    return null;
  }
};

export const logout = async (): Promise<void> => {
  try {
    //await apiClient.post("/logout");
    await SecureStore.deleteItemAsync("jwtToken");

  } catch (error: unknown) {
    console.error(error);
  }
};

export async function apiFetch<T>(
  endpoint: string,
  method: HttpMethod = "GET",
  requiresAuth: boolean = true,
  body?: Record<string, any>
): Promise<T | null> {
  try {
    if (requiresAuth) {
    }
    const config = {
      method,
      url: endpoint,
      data: body || undefined,
    };

    const res = await apiClient.request<T>(config);
    return res.data;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}

export async function handleLogin(email: string, password: string) {
  try {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
    });
    const data = response.data;
    if (data.token) {
      await SecureStore.setItemAsync("jwtToken", data.token);
    }
  } catch (error: unknown) {
    throw new HttpError(500, (error as Error).message);
  }
}
export async function register(request : RegisterRequest): Promise<boolean> {

    try {
        const response = await apiClient.post("/auth/register", {
        ...request       });
        const data = response.data;
        if (data) {
            await SecureStore.setItemAsync("jwtToken", data);

            return true
        }
        return false
    } catch (error: unknown) {
        throw new HttpError(500, (error as Error).message);
    }
}

export async function handleLogout(email: string) {
  try {
    await apiClient.post("/auth/logout", {
      email,
    });
    await SecureStore.deleteItemAsync("jwtToken");
  } catch (error: unknown) {
    throw new HttpError(500, (error as Error).message);
  }
}
