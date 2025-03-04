import { User } from '@/lib/entity/User';

export interface GroupMessageProps {
  user: User;
  sender: User;
  message: string;
  date: string;
}
export interface DirectMessageItemProps {
  user: User;
  contact: User;
  lastMessage: string;
  date: string;
}
export interface ChatHeaderProps {
  user: User;
  onFilterChange: (text: string) => void;
  mainPage: boolean;
}
export interface DirectMessagePageProps {
    user: User;
    recipient: User;
}
export interface MessageProps {
    profilePic: string;
    id: number;
    nickname: string
    message: string;
}
export interface MessageBarProps {
    user: User
    onSend: () => void;
}