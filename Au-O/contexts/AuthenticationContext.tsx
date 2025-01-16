import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Colors } from "@/constants/Colors";
import {
  apiFetch,
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
} from "@/lib/apiClient";
import {
  HttpError,
  RegisterRequest,
  User,
} from "@/constants/types";

interface AuthenticationContextType {
  user: User | null | undefined;
  login?: (usernameOrEmail: string, password: string) => Promise<boolean>;
  logout?: () => Promise<void>;
  register?: (
    request : RegisterRequest
  ) => Promise<boolean>;
  fetchUser?: () => Promise<User | null | undefined>;
}

const AuthenticationContext = createContext<
  AuthenticationContextType | undefined
>(undefined);

export const AuthenticationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {

  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  async function fetchUser() {
    try {
      const token = SecureStore.getItemAsync("jwtToken");

      if (!token) {
        return null;
      }
      const userData = await apiFetch<User>("auth/profile", "POST", false, {
        token,
      });
      if (userData !== null) {
        if (isMounted) {
          router.replace("/(root)/home");
        }
        return userData;
      } else {
        return undefined;
      }
    } catch (error: unknown) {
      return null;
    }
  }
  async function confirmAuth() {
    const userData = await fetchUser();
    if (userData) {
      setUser(userData);
      return true;
    } else {
      return false;
    }
  }
  async function login(
    usernameOrEmail: string,
    password: string
  ): Promise<boolean> {
    try {
      const request = {
        usernameOrEmail,
        password,
      };
      const response = await apiLogin(request);
      if (response) {
        await confirmAuth();
        router.replace("/(root)/home");
        return true;
      } else return false;
    } catch (error: unknown) {
      throw new HttpError(500, (error as Error).message);
    }
  }

  async function logout() {
    try {
      await apiLogout();
      setUser(null);
      await SecureStore.deleteItemAsync("jwtToken");

      router.replace("/(auth)/login");
    } catch (error: unknown) {
      throw new HttpError(500, (error as Error).message);
    }
  }
  async function register(
    request: RegisterRequest
  ): Promise<boolean> {
    try {
      const response = await apiRegister(
        request
      );
      if (response) {
        await confirmAuth();
        router.replace("/(root)/home");
        return true;
      }
      return false;
    } catch (error: unknown) {
      throw new HttpError(500, (error as Error).message);
    }
  }
  useEffect(() => {
    async function checkAuth() {
      await confirmAuth();
      setIsMounted(true);
    }
    checkAuth();
  }, []);

  if (user === undefined) {
    return (
      <AuthenticationContext.Provider value={{ user: undefined }}>
        <SafeAreaView>
          <ActivityIndicator size="large" color={Colors.highlight.main} />
        </SafeAreaView>
      </AuthenticationContext.Provider>
    );
  }

  return (
    <AuthenticationContext.Provider
      value={{ user, login, logout, fetchUser, register }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = (): AuthenticationContextType => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      "useAuthentication must be used within an AuthenticationProvider"
    );
  }
  return context;
};
