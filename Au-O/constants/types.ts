import { TouchableOpacityProps } from "react-native";
import { HttpErrorTexts } from "./texts";
import { ReactNode } from "react";

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
  usernameOrEmail: string;
  password: string;
}
export interface User {
  id: Number;
  username: string;
  password: string;
  nickname: string;
  role_id: Number;
  email: string;
  isPublic: boolean;
  profile_img: string;
  bio: string;
  date_of_birth: string
  date_of_signup: string
}
export interface LoginResponse {
  token?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
  nickname: string;
  date_of_birth: string;
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
export type TokenResponse = {
  token: string;
}
export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onChangeText?: (query: string) => void;
}
export interface PostCardProps {
  author_nickname: string;
  author_username: string;
  date: string;
  image: any; //temporary
  description: string;
  location: Geolocation
  reactions: Reactions
  comments: Comment[];
  language: "EN" | "HU";
  colorScheme: "light" | "dark";
}

export class Comment {
  id: number;
  text: string;
  replies: Array<Comment>

  constructor(id:number, text:string) {
    this.id = id;
    this.text = text;
    this.replies = new Array<Comment>
  }
}

// export type Comment = {
//   text: string
//   likes: number
// }
export type Reactions = {
  fire: number;
  heart: number;
  sunglasses: number;
}
export type Geolocation = {
  lat: number;
  lng: number;
}
export interface CommonStaticElementProps {
  children?: ReactNode;
  language: "EN" | "HU";
  colorScheme: "light" | "dark";
}
export interface AvatarProps {
  image: any;
  className?: string;
  nickname?: string;
  width?: number | string;
  height?: number | string;
}
export interface DropdownWrapperProps {
  visible: boolean
  handleOpen: () => void
  handleClose: () => void
  width: number
  children: ReactNode
}
export type UserResponse = User | null | undefined;