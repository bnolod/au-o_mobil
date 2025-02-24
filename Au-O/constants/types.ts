import { GestureResponderEvent, TextInputProps, TouchableOpacityProps } from 'react-native';
import { HttpErrorTexts } from './texts';
import { ReactNode } from 'react';
import { ImagePickerAsset } from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { User } from '@/lib/entity/User';
import { Car } from '@/lib/entity/Car';
import { Comment } from '@/lib/entity/Comment';
import { Post } from '@/lib/entity/Post';
import { Reply } from '@/lib/entity/Reply';
import { Group } from '@/lib/entity/Group';
import { SocialEvent } from '@/lib/entity/SocialEvent';

export interface OnboardingLayoutProps {
  headerText: React.ReactNode;
  heroText: string;
  ctaText: string;
  skippable?: Boolean;
}

export interface ButtonProps extends TouchableOpacityProps {
  variant?:
    | 'highlight' //piros
    | 'highlight-light' //világos piros
    | 'highlight-dark' //sötét piros
    | 'transparent' //fill és border nélkül
    | 'outline'; //csak border
  type?:
    | 'icon' //kerek, w=h
    | 'fit' //tartalom szélességéhez igazodik
    | 'fill'; //container szélességéhez igazodik
  children?: React.ReactNode;
  hapticFeedback?: 'light' | 'medium' | 'heavy';
  innerTextClassName?: string;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}
// export interface User {
//   id: number;
//   username: string;
//   password: string;
//   nickname: string;
//   role: string;
//   email: string;
//   isPublic: boolean;
//   profileImg: string;
//   bio: string;
//   dateOfBirth: string;
//   dateOfSignup: string;
// }
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
export interface ImageUploadResponse {
  url: string;
  deleteHash: string;
}
export type PostType = 'USERPOST' | 'GROUPOST' | 'EVENTPOST';

export type ImagePostResponseType = {
  id: number;
  url: string;
  index: number;
  deleteHash: string;
};

export interface ImageStoreRequest {
  text: string;
  postImages: ImageUploadResponse[];
  location: string;
  vehicleId: number | null;
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

export type ImageUploadType = {
  image: string;
  type: string;
};

export interface PostEditRequest {
  description: string;
  groupData: GroupPostData | null;
  eventData: EventPostData | null;
  location: string;
  vehicleId: number | null;
}
export interface CreatePostRequest {
  userId: number;
  description: string;
  images: ImagePickerAsset[];
  groupId: number | null;
  location: string;
  eventId: number | null;
  vehicleId: number | null;
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
  language: 'EN' | 'HU';
  colorScheme: 'light' | 'dark';
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


export interface CommentElementProps {
  item: Comment;
  preview?: boolean;
  userId: number;
  onDelete: (id: number) => void;
  authorId: number;
}
export interface FilterBarProps {
  className?: string;
  onChange: (text: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export interface InputProps {
  label?: string | ReactNode;
  secureTextEntry?: boolean;
  TextInputProps?: TextInputProps;
  containerClassName?: string;
  size?: number;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  colorScheme: 'light' | 'dark';
}
export interface ReplyProps {
  item: Reply;
  language: 'HU' | 'EN';
  userId: number;
  preview?: boolean;
  authorId: number;
  onDelete: (id: number) => void;
}

export interface SettingsAsideProps {
  userId: string;
  username: string;
  availableSettings: SettingsOption[];
}
export interface SettingsOption {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
  className?: string;
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

export interface NewSocialProps {
  text: string;
  onPress?: () => void;
}


export interface GarageItemProps {
  car: Car;
  onPress?: () => void;
  onSelect?: () => void;
  isOwner: boolean;
}

export interface SocialSortItemProps {
  bannerImage: string | null;
  name: string;
  memberCount: number;
  onSelect: () => void;
}
export interface SocialCardProps {
  group?: Group;
  event?: SocialEvent;
  preview?: 'CREATE' | 'DISPLAY' | undefined;
  type: 'GROUP' | 'EVENT';
  onCreatePress?: () => void;
}
export interface SocialBannerProps {
  name: string;
  id: number;
  header?: boolean;
  image?: string;
  type?: 'GROUP' | 'EVENT';
  onPress?: () => void;
  count?: number | null;
}
export interface ReactionButtonProps {
  type: 'FIRE' | 'HEART' | 'COOL';
  count: number;
  onPress?: () => void;
  state: 'active' | 'inactive';
  initialReactionState: 'FIRE' | 'HEART' | 'COOL' | null;
}
export interface UserListCardProps {
  user: User;
  dismissSheet: () => void;
  isOwner: boolean;
  type: 'follower' | 'following';
}

