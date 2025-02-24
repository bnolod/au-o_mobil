import { Car } from '@/lib/entity/Car';
import { GroupPost } from '@/lib/entity/Group';
import { EventPost } from '@/lib/entity/SocialEvent';
import { User } from '@/lib/entity/User';

export interface PostVehicleBannerProps {
  preview: boolean;
  vehicle: Car;
}

export interface PostDispayElementProps {
  onPress: () => void;
  postType: string;
  colorScheme: 'light' | 'dark';
  authorNickname: string;
  authorProfileImg: string;
  authorUsername: string;
  groupData: GroupPost | null;
  eventData: EventPost | null;
}
export interface PostFooterProps {
  currentReaction: 'FIRE' | 'HEART' | 'COOL' | null;
  reactionState: { FIRE: number; HEART: number; COOL: number };
  preview: boolean;
  handlePress: (type: 'FIRE' | 'HEART' | 'COOL' | null) => void;
  location: string;
  date: string;
  authorUsername: string;
  authorId: number;
  authorNickname: string;
  comments: any;
  description: string;
  postId: number;
  user: User;
}
