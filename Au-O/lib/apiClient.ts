import {
  HttpError,
  HttpMethod,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  TokenResponse,
  User,
} from "@/constants/types";
import axios, { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";

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
    const response = await apiClient.post<string>("auth/login", request);
    if (response) {
      await SecureStore.setItemAsync("jwtToken", response.data);
    }
    return response.data;
  } catch (error: unknown) {
    return null;
  }
};
  export async function validateToken(token: string) {
    const validToken = await apiFetch<string>("auth/authenticate", "POST", true, {
      token
    }).then((response) => {
      SecureStore.setItemAsync("jwtToken", response!);
      return response
    });
    return validToken
    
  }
export const logout = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync("jwtToken");
  } catch (error: unknown) {
    console.error(error);
  }
};

export async function getUser(token: string): Promise<User | null | undefined> {
    try {
      
      if (!token) {
        return null
      }
      const user = await apiFetch<User>("auth/profile", "GET", true);
      if (user) {
        
        return user;
      } else return null
    } catch(error: unknown) {
      console.error(error);
      return null;
    }
  }

export async function apiFetch<T>(
  endpoint: string,
  method: HttpMethod = "GET",
  requiresAuth: boolean = true,
  body?: Record<string, any>
): Promise<T | null> {
  try {
    const config = {
      method,
      url: endpoint,
      data: body || undefined,
      headers: {
        "Content-Type": "application/json",
        Authorization: requiresAuth
          && `Bearer ${await SecureStore.getItemAsync("jwtToken")}`
      },
    };


    const res = await apiClient.request<T>(config);
    return res.data;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}

export async function handleRegister(
  request: RegisterRequest
): Promise<string> {
  try {
    const response = await apiFetch<TokenResponse>("auth/register", "POST", false, request);
    
    if (response!.token) {
      return response!.token;
    }
    throw new HttpError(500, "No token in response");
  } catch (error: unknown) {
    throw error;
  }
}
export async function handleLogin( request: LoginRequest): Promise<string> {
  try {
    const response = await apiFetch<TokenResponse>("auth/login", "POST", false, request);

    if (response!.token) {
      return response!.token;
    }
    throw new HttpError(500, "No token in response");
  } catch (error: unknown) {
    throw error;
  }

}
