import { HttpError, User, LoginRequest, LoginResponse } from "@/constants/types";
import apiClient, { apiFetch, login as apiLogin, logout as apiLogout } from "@/lib/apiClient";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";

interface AuthenticationContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

export const AuthenticationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  async function fetchUser() {
    try {
      const userData = await apiFetch<User>('/users/all', 'GET');
      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error: unknown) {
      throw new HttpError(500, (error as Error).message);
    }
  }

  async function login(usernameOrEmail: string, password: string): Promise<boolean> {
    try {
        const request: LoginRequest = usernameOrEmail.includes('@') ? { email: usernameOrEmail, password } : { username: usernameOrEmail, password };
      const response = await apiLogin(request);
      if (response) {
        await SecureStore.setItemAsync('jwtToken', response.token!);
        setUser({ email: response.user.email, id: response.user.id, username: response.user.username });
        return true;
      }
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
    //fetchUser()
    async function testApi() {
      try {
        const response = await fetch('http://localhost:8080/api/v1/users/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        console.log(response);
      } catch (error: unknown) {
        console.error((error as Error).message);
      }
    }
    testApi();
  }, []);

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