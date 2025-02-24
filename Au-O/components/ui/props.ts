import { ReactNode } from 'react';
import { TextInputProps, TextProps, TouchableOpacityProps } from 'react-native';
import {Comment} from '@/lib/entity/Comment'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Reply } from '@/lib/entity/Reply';
import { User } from '@/lib/entity/User';
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
export interface AvatarProps {
  image: any;
  className?: string;
  nickname?: string;
  width?: number | string;
  height?: number | string;
}
export interface CollapsibleTextProps {
  restrictedLineCount?: number;
  children: ReactNode;
  className?: string;
  TextProps?: TextProps;
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
export interface LoadingModalProps {
  loading: boolean;
  text?: string;
  onStart?: () => void;
  onEnd?: () => void;
}
export interface ReactionButtonProps {
  type: 'FIRE' | 'HEART' | 'COOL';
  count: number;
  onPress?: () => void;
  state: 'active' | 'inactive';
  initialReactionState: 'FIRE' | 'HEART' | 'COOL' | null;
}

export interface ReplyProps {
  item: Reply;
  language: 'HU' | 'EN';
  userId: number;
  preview?: boolean;
  authorId: number;
  onDelete: (id: number) => void;
}
export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onChangeText?: (query: string) => void;
}
export interface ThemedTextProps extends TextProps {
  children?: ReactNode;
  className?: string;
  color?: string;
}
export interface UserListCardProps {
  user: User;
  dismissSheet: () => void;
  isOwner: boolean;
  type: 'follower' | 'following';
}
export interface TapWrapperProps {
  onSingleTap?: () => void;
  onDoubleTap?: () => void;
  children: React.ReactNode;
}
