import { TouchableOpacityProps } from "react-native";
import { HttpErrorTexts } from "./texts";

export interface OnboardingLayoutProps {
  headerText: React.ReactNode;
  heroText: string;
  ctaText: string;
  skippable?: Boolean;
}

export interface ButtonProps extends TouchableOpacityProps {
  variant?:
    | "highlight" //piros
    | "highlight-light" //világos piros
    | "highlight-dark" //sötét piros
    | "transparent" //fill és border nélkül
    | "outline"; //csak border
  type?: 
     "icon" //kerek, w=h
   | "fit" //tartalom szélességéhez igazodik
   | "fill"; //container szélességéhez igazodik
  children?: React.ReactNode;
  hapticFeedback?: | "light" | "medium" | "heavy";
}

export interface LoginRequest {
  username?: string;
  email?: string;
  password: string;
}
export interface User {
  id: string; //ha uuid
  username: string;
  email: string
}
export interface LoginResponse {
  user: User;
  message: string;
  token?: string;
}
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export interface IHttpError {
  status: number;
  message?: string | undefined;
  language?: "EN" | "HU";
}

export class HttpError implements IHttpError {
  constructor(public status: number, public message?: string | undefined, public language: "EN" | "HU" = "EN") {
    this.message = message || HttpErrorTexts[(status) as keyof typeof HttpErrorTexts][language];
    this.status = status;
    
  }
}