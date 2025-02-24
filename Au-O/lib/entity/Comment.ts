import { Reactions } from '@/constants/types';
import { User } from './User';
import { Reply } from './Reply';

export interface Comment {
  id: number;
  time: string;
  reactionTypeMap: Reactions;
  reactedWith: null | 'FIRE' | 'HEART' | 'COOL';
  user: User;
  text: string;
  replies: Reply[] | null;
}
