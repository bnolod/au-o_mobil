import { User } from '@/lib/entity/User';
import LatestMessage from '@/lib/entitywebsock/LatestMessage';

export interface GroupMessageProps {
  user: User;
  sender: User;
  message: string;
  date: string;
}
export interface DirectMessageItemProps {
  user: User;
  latestMessage: LatestMessage;
  date: string;
}
export interface ChatHeaderProps {
  user: User;
  onFilterChange: (text: string) => void;
  language: "EN" | "HU";
  mainPage: boolean;
}
export interface DirectMessagePageProps {
    user: User;
    recipient: User;
    language: "EN" | "HU";
    colorScheme: "dark" | "light";
}
export interface MessageProps {
    profilePic: string;
    colorScheme: "dark" | "light";
    id: number;
    nickname: string
    message: string;
    isFirst: boolean
    isLast: boolean
}
export interface MessageBarProps {
    text: string,
    language: "EN" | "HU",
    onSend: () => void;
    onChange: (text: string
    ) => void
}