import {
  Comment,
  CreatePostRequest,
  HttpError,
  HttpMethod,
  ImageStoreRequest,
  ImageUploadResponse,
  LoginRequest,
  Reactions,
  ReactionState,
  RegisterRequest,
  Reply,
  TokenResponse,
  User,
  UserResponse,
} from "@/constants/types";
import axios, { AxiosInstance } from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createImageForm, deleteUser, saveUser } from "./functions";
import { eventEmitter } from "./events";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_AXIOS_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: function (status) {
    return true;
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
export async function logout() {
  await SecureStore.deleteItemAsync("jwtToken");
  await deleteUser();

  eventEmitter.emit("triggerLogout");
}
export async function deleteImgurImage(deleteHash: string) {
  const req = await fetch(`https://api.imgur.com/3/image/${deleteHash}`, {
    method: "DELETE",
    headers: {
      Authorization: `Client-ID ${process.env.EXPO_PUBLIC_IMGUR_CLIENT_ID}`,
    },
  });
  if (req.status === 200) {
    return true;
  }
  return false;
}
export async function validateToken(token: string, path: string) {
  const validToken = await apiFetch<string>("auth/authenticate", "POST", true, {
    token,
  });

  if (!validToken?.data) {
    if (path === "/onboarding" || path === "/login" || path === "/register") {
      await logout();
      router.replace("/(auth)/login");
    }
  } else {
    SecureStore.setItemAsync("jwtToken", validToken.data!);
    return validToken.data;
  }
  return validToken?.data;
}
export const imageUpload = async (
  image: FormData
): Promise<ImageUploadResponse | null> => {
  const endpoint = "https://api.imgur.com/3/image";
  const headers = {
    Authorization: `Client-ID ${process.env.EXPO_PUBLIC_IMGUR_CLIENT_ID}`,
    "Content-Type": "multipart/form-data",
  };
  try {
    const response = await axios.post(endpoint, image, { headers });
    if (response.status !== 200) {
      return null;
    }
    const data = response.data.data;

    return {
      url: data.link,
      deleteHash: data.deletehash,
    };
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
};
export async function storeImages(request: ImageStoreRequest): Promise<any> {
  const res = await apiFetch("posts/post/user", "POST", true, request);
  if (res) {
    return res.data;
  } else return null;
}
export async function CreatePost(props: CreatePostRequest): Promise<void> {
  await apiFetch<CreatePostRequest>("post/new", "POST", true, {
    ...props,
  });
}
export async function addReaction(
  postId: number,
  reaction: "HEART" | "FIRE" | "COOL"
) {
  const res = await fetch(
    `${apiClient.defaults.baseURL}/posts/post/${postId}/addOrRemoveReaction/${reaction}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await SecureStore.getItemAsync("jwtToken")}`,
      },
    }
  );
  if (res.status === 200) return true;
  return false;
}
export async function editPost(text: string, location: string, id: string) {
  const res = await apiFetch(`/posts/post/${id}`, "PUT", true, {
    text,
    location,
  });
  if (res) {
    return res.data;
  } else return null;
}
export async function getUser(token: string): Promise<User | null | undefined> {
  try {
    if (!token) {
      return null;
    }
    const user = await apiFetch<User>("auth/profile", "GET", true);
    if (user) {
      return user.data;
    } else return null;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}

export async function apiFetch<T>(
  endpoint: string,
  method: HttpMethod = "GET",
  requiresAuth: boolean = true,
  body?: Record<string, any>
): Promise<{ data: T | null; status: number } | null> {
  try {
    const config = {
      method,
      url: endpoint,
      data: body || undefined,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          requiresAuth &&
          `Bearer ${await SecureStore.getItemAsync("jwtToken")}`,
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

export async function handleRegister(
  request: RegisterRequest
): Promise<string> {
  try {
    const response = await apiFetch<TokenResponse>(
      "auth/register",
      "POST",
      false,
      request
    );
    if (response!.data!.token) {
      return response!.data!.token;
    }
    return Promise.reject();
  } catch (error: unknown) {
    throw new HttpError(500, "No token in response");
  }
}
async function refreshUser() {
  const token = await SecureStore.getItemAsync("jwtToken");
  const res = await getUser(token!);
  if (res) {
    await saveUser(res);
  }
}
export async function handleLogin(request: LoginRequest): Promise<string> {
  const response = await apiFetch<TokenResponse>(
    "auth/login",
    "POST",
    false,
    request
  );

  return response!.data!.token;
}

export async function AddCommentToPost(
  postId: string,
  comment: string
): Promise<Comment | null> {
  const res = await apiFetch<Comment>(
    `posts/post/${postId}/comment`,
    "POST",
    true,
    {
      text: comment,
    }
  );
  if (res) return res.data;
  return null;
}
export async function DeleteComment(commentId: string): Promise<boolean> {
  const res = await fetch(
    `${apiClient.defaults.baseURL}/posts/post/comment/${commentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${await SecureStore.getItemAsync("jwtToken")}`,
      },
    }
  );
  if (res.status === 200) return true;
  else return false;
}
export async function sendReply(
  commentId: string,
  text: string
): Promise<Reply | null> {
  const res = await apiFetch<Reply>(
    `posts/post/comment/${commentId}/reply`,
    "POST",
    true,
    {
      text,
    }
  );
  if (res) return res.data;
  return null;
}
export async function deleteReply(replyId: number) {
  const res = await fetch(
    `${apiClient.defaults.baseURL}/posts/post/comment/reply/${replyId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${await SecureStore.getItemAsync("jwtToken")}`,
      },
    }
  );
  if (res.status === 200) return true;
  else return false;
}

export async function updateProfilePicture(imageForm: FormData) {
  const image = await imageUpload(imageForm);
  if (image) {
    const token = await SecureStore.getItemAsync("jwtToken");
    const req = await fetch(`${apiClient.defaults.baseURL}/users/user/update`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
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
export async function getFollows(userId: string) {
  const followingRes = await apiFetch<UserResponse[]>(
    `users/user/${userId}/following`,
    "GET",
    true
  );
  const followersRes = await apiFetch<UserResponse[]>(
    `users/user/${userId}/followers`,
    "GET",
    true
  );
  if (followingRes && followersRes) {
    return {
      following: followingRes.data,
      followers: followersRes.data,
    }
  } else return null;
}
export async function followUser(userId: string) {
  const res = await apiFetch<UserResponse>(`users/user/${userId}/follow`, "POST", true);
  console.log(res);
  if (res && res.status === 200) {
    
    return true;
  } else return false;
}
export async function unfollowUser(userId: string) {
  const res = await apiFetch<UserResponse>(`users/user/${userId}/unfollow`, "DELETE", true);
  console.log(res);
  if (res && res.status === 200) {
    return true;
  } else return false;
}