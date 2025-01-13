import { HttpError, HttpMethod, LoginRequest, LoginResponse } from '@/constants/types';
import axios, {AxiosInstance} from 'axios';
import Cookies from '@react-native-cookies/cookies';
const apiClient: AxiosInstance = axios.create(
    {
        baseURL: process.env.AXIOS_BASE_URL,
        withCredentials: true,
    }
)

export default apiClient;

export const login = async (request: LoginRequest): Promise<LoginResponse | null> => {
    try {
        const response = await apiClient.post<LoginResponse>('/login', request);

        return response.data;
    } catch (error: unknown) {
        return null
    }
}

export const logout = async (): Promise<void> => {
    try {
        await apiClient.post('/logout');
        await Cookies.clearAll();
    }
    catch (error: unknown) {
        console.error(error);
    }
}

export async function apiFetch<T>(
    endpoint: string,
    method: HttpMethod = 'GET',
    requiresAuth: boolean = true,
    body?: Record<string, any>
): Promise<T | null> {
    try {
        if (requiresAuth) {
            const cookies = await Cookies.get(process.env.AXIOS_BASE_URL!);
            if (!cookies) {
                throw new HttpError("No cookies found", 401);
            }
        }
        const config = {
            method,
            url: endpoint,
            data: body || undefined,
        }

        const res = await apiClient.request<T>(config);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
}