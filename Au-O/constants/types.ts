import { GestureResponderEvent, TextInputProps, TouchableOpacityProps } from 'react-native';
import { HttpErrorTexts } from './texts';
import { ReactNode } from 'react';
import { ImagePickerAsset } from 'expo-image-picker';

export interface OnboardingLayoutProps {
  headerText: React.ReactNode;
  heroText: string;
  ctaText: string;
  skippable?: Boolean;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}
export interface LoginResponse {
  token?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
  nickname: string;
  dateOfBirth: string;
}
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface IHttpError {
  status: number;
  message?: string | undefined;
  language?: 'EN' | 'HU';
}

export class HttpError implements IHttpError {
  constructor(
    public status: number,
    public message?: string | undefined,
    public language: 'EN' | 'HU' = 'EN'
  ) {
    this.message = message || HttpErrorTexts[status as keyof typeof HttpErrorTexts][language];
    this.status = status;
  }
}
export type TokenResponse = {
  token: string;
};

export interface ModalState {
  visible: boolean;
  content: ReactNode | null;
  event: GestureResponderEvent | null;
}

export type Reactions = {
  FIRE: number;
  HEART: number;
  COOL: number;
};
export interface CommonStaticElementProps {
  children?: ReactNode;
  language: 'EN' | 'HU';
  colorScheme: 'light' | 'dark';
}

export type ReactionState = {
  fire: number;
  heart: number;
  sunglasses: number;
};

export interface PostCarouselElementProps {
  images: string[];
  index: number;
}
export interface PostOptionMenuProps {
  preview: boolean;
  language: 'EN' | 'HU';
  postId: number;
  userId: number | null;
  authorId: number | null;
  onDelete?: () => void;
}

export type CarType =
  | 'SEDAN'
  | 'COUPE'
  | 'GRANDCOUPE'
  | 'HATCH'
  | 'KOMBI'
  | 'CABRIOLET'
  | 'PICKUP'
  | 'ROADSTER'
  | 'SUV';
