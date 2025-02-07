import { GestureResponderEvent, TouchableOpacityProps } from "react-native";
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
    | "icon" //kerek, w=h
    | "fit" //tartalom szélességéhez igazodik
    | "fill"; //container szélességéhez igazodik
  children?: React.ReactNode;
  hapticFeedback?: "light" | "medium" | "heavy";
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}
export interface User {
  id: number;
  username: string;
  password: string;
  nickname: string;
  role: string;
  email: string;
  isPublic: boolean;
  profileImg: string;
  bio: string;
  dateOfBirth: string;
  dateOfSignup: string;
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
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export interface IHttpError {
  status: number;
  message?: string | undefined;
  language?: "EN" | "HU";
}

export class HttpError implements IHttpError {
  constructor(
    public status: number,
    public message?: string | undefined,
    public language: "EN" | "HU" = "EN"
  ) {
    this.message =
      message ||
      HttpErrorTexts[status as keyof typeof HttpErrorTexts][language];
    this.status = status;
  }
}
export type TokenResponse = {
  token: string;
};
export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onChangeText?: (query: string) => void;
}
export interface GroupPostData {
  groupName: string;
  groupNickname: string;
  groupIcon: string | null;
}
export interface EventPostData {
  eventName: string;
  attendees: number;
  groupId?: string;
  location: string;
  startDate: string;
  endDate: string;
}
export type PostType = "USER" | "GROUP" | "EVENT" | "INVALID";
export interface PostDispayElementProps {
  onPress: () => void;
  postType: string;
  colorScheme: "light" | "dark";
  authorNickname: string;
  authorProfileImg: string,
  authorUsername: string;
  groupData: GroupPostData | null;
  eventData: EventPostData | null;
}
export interface ImageUploadResponse {
  url: string;
  deleteHash: string;
}
export type PostResponseType = "USERPOST" | "GROUPOST" | "EVENTPOST";
export type UserPostResponseType = {
  isPublic: boolean;
  bio: string;
  dateOfSignup: string;
  id: number;
  nickname: string;
  profileImg: any;
  username: string;
};
export type ImagePostResponseType = {
  id: number;
  url: string;
  index: number;
  deleteHash: string;
};
export interface PostResponse {
  dateOfCreation: string;
  dateOfUpdate: string;
  group: any;
  images: ImageUploadResponse[];
  location: string;
  postId: number;
  postType: PostResponseType;
  reactionTypeMap: Reactions
  text: string;
  user: UserPostResponseType;
  comments: Comment[];
}
export interface ImageStoreRequest {
  text: string;
  postImages: ImageUploadResponse[];
  location: string;
}

export interface ModalState {
  visible: boolean;
  content: ReactNode | null;
  event: GestureResponderEvent | null;
}
export interface TapWrapperProps {
  onSingleTap?: () => void;
  onDoubleTap?: () => void;
  children: React.ReactNode;
}

export interface PostCardProps {
  postId: number | null;
  preview?: boolean;
  groupData?: GroupPostData;
  authorProfileImg: string;
  eventData?: EventPostData;
  authorNickname: string;
  authorUsername: string;
  date: string;
  images: {
    url: string;
    deleteHash: string;
  
  }[];
  description: string;
  location: string;
  reactions: Reactions;
  comments: Comment[];
  language: "EN" | "HU";
  colorScheme: "light" | "dark";
}

export type ImageUploadType = {
  image: string;
  type: string;
};
export interface Comment {
  id: number;
  time: string;
  user: UserPostResponseType;
  text: string;
  replies: Reply[] | null;
}
export interface Reply {
  id: number;
  time: string;
  user: UserPostResponseType;
  text: string;
}
export interface CreatePostRequest {
  userId: string;
  description: string;
  images: string[];
  group: string;
  location: string;
  event: string;
}
export interface LoadingModalProps {
  loading: boolean;
  text?: string;
  onStart?: () => void;
  onEnd?: () => void;
}
export type Reactions = {
  FIRE: number;
  HEART: number;
  COOL: number;
};
export type Geolocation = {
  lat: number;
  lng: number;
};
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
  visible: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  width: number;
  children: ReactNode;
}
export type UserResponse = User | null | undefined;

export type ReactionState = {
  fire: number;
  heart: number;
  sunglasses: number;
}