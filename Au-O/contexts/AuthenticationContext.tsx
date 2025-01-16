import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { Colors } from "@/constants/Colors";
import { apiFetch, login as apiLogin, logout as apiLogout } from "@/lib/apiClient";
import { HttpError, User, LoginRequest, LoginResponse } from "@/constants/types";

interface AuthenticationContextType {
  user: User | null | undefined;
  login?: (usernameOrEmail: string, password: string) => Promise<boolean>;
  logout?: () => Promise<void>;
  fetchUser?: () => Promise<void>;
}

const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

export const AuthenticationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  /*const [user, setUser] = useState<User | null | undefined>({
    username: 'teszt',
    password: 'teszt',
    nickname: 'teszt',
    role_id: 1,
    email: 'teszt',
    isPublic: true,
    profile_img: 'teszt',
    bio: 'teszt',
    date_of_birth: new Date(),
    id: 1
  });*/
  const [user, setUser] = useState<User | null | undefined>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  async function fetchUser() {
    try {
      const userData = await apiFetch<User>('auth/profile', 'POST');
      if (userData !== null) {
        console.log(userData);
        setUser(userData);
      } else {
        setUser(undefined);
      }
    } catch (error: unknown) {
      setUser(null);
      throw new HttpError(500, (error as Error).message);
    }
  }

  async function login(usernameOrEmail: string, password: string): Promise<boolean> {
    try {
    const request = {
      usernameOrEmail,
      password
    }
    const response = await apiLogin(request);
    console.log(response);
      return false;
    } catch (error: unknown) {
      throw new HttpError(500, (error as Error).message);
    }
  }

  async function logout() {
    try {
      await apiLogout();
      await SecureStore.deleteItemAsync('jwtToken');
      setUser(null);
    } catch (error: unknown) {
      throw new HttpError(500, (error as Error).message);
    }
  }

  useEffect(() => {
    //fetchUser();
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && user === null) {
      router.push('/(auth)/login');
    }
  }, [user, isMounted, router]);

  if (user === undefined) {
    return (
      <AuthenticationContext.Provider value={{user: undefined}}>
        <SafeAreaView>
          <ActivityIndicator size="large" color={Colors.highlight.main} />
        </SafeAreaView>
      </AuthenticationContext.Provider>
    );
  }

  return (
    <AuthenticationContext.Provider value={{ user, login, logout, fetchUser }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = (): AuthenticationContextType => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error('useAuthentication must be used within an AuthenticationProvider');
  }
  return context;
};