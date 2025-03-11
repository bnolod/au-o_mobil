import { Reactions } from '@/constants/types';
import { Car } from '@/lib/entity/Car';
import { Image } from '@/lib/entity/Image';
import { User } from '@/lib/entity/User';
import { Comment } from '@/lib/entity/Comment';
import { Group } from '@/lib/entity/Group';
import { SocialEvent } from '@/lib/entity/SocialEvent';

export interface PostCardProps {
  favorite: boolean;
  postId: number | null;
  reaction: null | 'FIRE' | 'HEART' | 'COOL';
  preview?: boolean;
  user: User;
  authorId: number | null;
  group: Group | null;
  authorProfileImg: string;
  event: SocialEvent | null;
  authorNickname: string;
  authorUsername: string;
  date: string;
  images: Image[];
  description: string;
  allowOptions?: boolean;
  location: string;
  reactions: Reactions;
  vehicle: Car | null;
  comments: Comment[];
  language: 'EN' | 'HU';
  colorScheme: 'light' | 'dark';
}
