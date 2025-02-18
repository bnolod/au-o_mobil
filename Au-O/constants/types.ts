import {
  GestureResponderEvent,
  TextInputProps,
  TouchableOpacityProps,
} from "react-native";
import { HttpErrorTexts } from "./texts";
import { ReactNode } from "react";
import { ImagePickerAsset } from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

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
  innerTextClassName?: string;
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
  authorProfileImg: string;
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
  reactionTypeMap: Reactions;
  text: string;
  user: UserPostResponseType;
  comments: Comment[];
  reactedWith: null | "FIRE" | "HEART" | "COOL";
  vehicle: Car | null
}
export interface ImageStoreRequest {
  text: string;
  postImages: ImageUploadResponse[];
  location: string;
  vehicleId: number | null
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
  reaction: null | "FIRE" | "HEART" | "COOL";
  preview?: boolean;
  user: UserResponse;
  authorId: number | null;
  groupData?: GroupPostData;
  authorProfileImg: string;
  eventData?: EventPostData;
  authorNickname: string;
  authorUsername: string;
  date: string;
  images: ImageUploadResponse[];
  description: string;
  location: string;
  reactions: Reactions;
  vehicle: Car | null;
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
  userId: number;
  description: string;
  images: ImagePickerAsset[];
  group: string | null;
  location: string;
  event: string | null;
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
};
export interface AddCommentRowProps {
  authorNickname: string;
  focus: boolean;
  postId: number;
  onPostComment: (res: Comment) => void;
}
export interface CommentSheetProps {
  comments: Comment[];
  authorNickname: string;
  preview?: boolean;
  userNickname: string;
  postId: number;
  userProfileImg: string;
  authorId: number;
  userId: number;
}
export interface PostCarouselElementProps {
  images: string[];
  index: number;
}
export interface PostOptionMenuProps {
  preview: boolean;
  language: "EN" | "HU";
  postId: number;
  userId: number | null;
  authorId: number | null;
  onDelete?: () => void;
}

export interface PostCreationSheetElementProps {
  group?: any;
  event?: any;
  onPress: (selected: any) => void;
  title: string;
}
export interface OnboardHeaderProps {
  isStatic?: boolean;
  onBackPress?: () => void;
  onSkipPress?: () => void;
  index?: number;
}
export interface CommentElementProps {
  item: Comment;
  userId: number;
  onDelete: (id: number) => void;
  authorId: number;
}
export interface FilterBarProps {
  onChange: (value: string) => void;
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
  colorScheme: "light" | "dark";
}
export interface ReplyProps {
  item: Reply;
  language: "HU" | "EN";
  userId: number;
  authorId: number;
  onDelete: (id: number) => void;
}
export interface TextEditModalProps {
  visible: boolean;
  onSave: (text: string) => void;
  onCancel?: () => void;
  initialValue?: string;
  labelComponent?: ReactNode;
  placeholder?: string;
  lines?: number;
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

export interface Group {
  id: string;
  name: string;
  alias: string;
  bannerImage: string;
  memberCount: number;
  public: boolean;
  creationDate: string;
  member: boolean;
  description: string;
}
export interface SocialEvent {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  attendees: number;
  groupId?: string;
  creationDate: string;
  bannerImage: string;
  public: boolean;
  isAttending: boolean;
}
export interface Car {
  id: string;
  manufacturer: string;
  model: string;
  type: CarType;
  horsepower: number;
  description: string;
  displacement: number;
  productionYear: number;
}
export interface CarResponse extends Car {
  owner: User;
}
export interface CarCreationRequest {
  manufacturer: string;
  model: string;
  type: CarType;
  horsepower: number;
  description: string;
  displacement: number;
  productionYear: number;
}
export type CarType =
  | "SEDAN"
  | "COUPE"
  | "GRANDCOUPE"
  | "HATCH"
  | "KOMBI"
  | "CABRIOLET"
  | "PICKUP"
  | "ROADSTER"
  | "SUV";
export interface GroupCreationRequest {
  name: string;
  description: string;
  bannerImage: string; //majd backenden mindenképp legyen deletehash
  alias: string;
}
export interface GroupCreationResponse {
  id: string;
  name: string;
  description: string;
  bannerImage: string;
  alias: string;
  memberCount: number;
  public: boolean;
  creationDate: string;
  member: boolean;
}
export interface NewSocialProps {
  text: string;
  onPress?: () => void;
}
export interface FollowerSheetProps {
  followers: User[];
  following: User[];
  dismissSheet: () => void;
  isOwner: boolean;
}
export interface GarageItemPageProps {
  car: Car;
  isOwner: boolean;
  profileImg: string;
}
export interface GarageItemProps {
  car: Car;
  onPress?: () => void;
  onSelect?: () => void;
  isOwner: boolean;
}
export interface ProfileProps {
  user: User;
  profile: User;
  id: string;
  garage: CarResponse[];
  followers: User[];
  following: User[];
  setFollowing: (users: User[]) => void;
  setFollowers: (users: User[]) => void;
  posts: PostResponse[];
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
  preview?: "CREATE" | "DISPLAY" | undefined;
  type: "GROUP" | "EVENT";
  onCreatePress?: () => void;
}
export interface SocialBannerProps {
  name: string;
  id: string;
  header?: boolean;
  image?: string;
  type?: "GROUP" | "EVENT";
  onPress?: () => void;
  count?: number | null;
}
export interface ReactionButtonProps {
  type: "FIRE" | "HEART" | "COOL";
  count: number;
  onPress?: () => void;
  state: "active" | "inactive";
  initialReactionState: "FIRE" | "HEART" | "COOL" | null;
}
export interface UserListCardProps {
  user: User;
  dismissSheet: () => void;
  isOwner: boolean;
  type: "follower" | "following";
}
export interface CarTypeListItemProps {
  onPress: () => void;
  type: CarType;
  colorScheme: "light" | "dark";
}
