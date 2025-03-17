/**
 * Authentikációért felelős context
 * @module contexts/AuthenticationContext
 * @category Contexts
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { handleLogin as apiLogin, handleRegister as apiRegister, logout } from '@/lib/apiClient';
import { HttpError, LoginRequest, RegisterRequest } from '@/constants/types';
import UserLoading from '@/components/auth/UserLoading';
import { deleteUser, saveUser } from '@/lib/functions';
import { User } from '@/lib/entity/User';
import { getUser } from '@/lib/ApiCalls/UserApiCalls';
import { logout as logoutfn } from '@/lib/apiClient';

/**
 * Authentikációért felelős context típusa
 * @type
 */
export type AuthenticationContextType = {
  /**
   * Felhasználó
   * @type {User | null | undefined}
   * @default undefined
   * @see User
   */
  user: User | null | undefined;
  /**
   * Bejelentkezésért felelős funkció
   * @param request Bejelentkezési adatok
   * @returns {Promise<boolean>} Bejelentkezés sikeressége 
   */
  login?: (request: LoginRequest) => Promise<boolean>;
  /**
   * Kijelentkezésért felelős callback
   * @callback
   * @returns {Promise<void>}
   */
  logout?: () => Promise<void>;
  /**
   * Regisztrációért felelős funkció
   * @param request Regisztrációs adatok
   * @returns {Promise<string>} JWT token
   */
  register?: (request: RegisterRequest) => Promise<string>;
}

const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

export const AuthenticationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(null);

  /**
   * Regisztrációt végrehajtó funkció
   * @param request Regisztrációs adatok
   * @returns {Promise<string>} JWT token
   */
  async function register(request: RegisterRequest): Promise<string> {
    try {
      const response = await apiRegister(request);
      if (response) {
        await SecureStore.setItemAsync('jwtToken', response);
        const user = await getUser(response);
        if (user) {
          await saveUser(user);
          setUser(user);
        }
        return response;
      }
      throw new HttpError(500, 'Registration failed');
    } catch (error: unknown) {
      throw new HttpError(500, 'Registration failed');
    }
  }

  useEffect(() => {
    async function getStoredUser() {
      const user = await SecureStore.getItemAsync('user');

      setUser(user ? JSON.parse(user) : null);
    }
    getStoredUser();
  }, []);

  /**
   * Bejelentkezést végrehajtó funkció
   * @param request Bejelentkezési adatok
   * @returns {Promise<string>} JWT token
   */
  async function login(request: LoginRequest): Promise<boolean> {
    try {
      const token = await apiLogin(request);
      if (token) {
        await SecureStore.setItemAsync('jwtToken', token);
        const user = await getUser(token);
        if (user) {
          await saveUser(user);
          setUser(user);
          return true;
        }
      }
      return false;
    } catch (error: unknown) {
      console.error(error);
      return false;
    }
  }
  if (user === undefined) {
    return (
      <AuthenticationContext.Provider value={{ user: undefined }}>
        <UserLoading />
      </AuthenticationContext.Provider>
    );
  }

  const logout = async() => {
    await logoutfn();
    setUser(null);
  }

  return (
    <AuthenticationContext.Provider value={{ user, login, logout, register }}>
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
