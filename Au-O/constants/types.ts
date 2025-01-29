import { TouchableOpacityProps } from "react-native";
import { HttpErrorTexts } from "./texts";
import { ReactNode } from "react";
import { ImagePickerAsset } from "expo-image-picker";

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
export interface GroupPostData {

  group_name: string
  group_nickname: string
  group_icon: string | null
}
export interface EventPostData {
  event_name: string
  attendees: number
  group_id?: string
  location : string
  start_date: string
  end_date: string

}
export type PostType = "USER" | "GROUP" | "EVENT" | "INVALID"
export interface PostDispayElementProps {
  
      onPress: () => void,
      postType: string,
      colorScheme: "light" | "dark",
      author_nickname: string,
      author_username: string,
      groupData: GroupPostData | null,
      eventData: EventPostData | null
}
export interface ImageUploadResponse {
  url: string,
  deleteHash: string
}
export type PostResponseType = "USERPOST" | "GROUPOST" | "EVENTPOST"
export type UserPostResponseType = {
  _public:boolean,
  bio:string,
  date_of_signup:string,
  id: number,
  nickname: string,
  profile_img:any,
  username: string
}
export type ImagePostResponseType = {
  id: number,
  url: string
  index: number
  deleteHash: string
}
export interface PostResponse {
  
    date_of_creation: string,
    date_of_update: string,
    group: any,
    images: ImageUploadResponse[],

    post_id: string,
    post_type: PostResponseType
    reaction_count: number,
    text: string,
    user:UserPostResponseType
 
}
export interface ImageStoreRequest {
  text: string,
  postImages: ImageUploadResponse[]
  location: string
}
export interface PostCardProps {
  preview?: boolean
  groupData?: GroupPostData
  eventData?: EventPostData
  author_nickname: string;
  author_username: string;
  date: string;
  images: string[]
  description: string;
  location: string
  reactions: Reactions
  comments: Comment[];
  language: "EN" | "HU";
  colorScheme: "light" | "dark";
}
export interface PostPreviewProps {
  author_nickname: string
  author_username: string
  
  date: string
  images: ImagePickerAsset[]
  description: string
  location: string,
  handleDismiss: () => void
  handleSubmit: () => void
  
}
export type ImageUploadType = {
  image: string;
  type: string;
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
export interface CreatePostRequest {
  user_id: string
  description: string
  images: string[]
  group: string
  location: string
  event: string
}
export interface LoadingModalProps {
  loading: boolean;
  text?: string;
  onStart?: () => void;
  onEnd?: () => void;
}
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