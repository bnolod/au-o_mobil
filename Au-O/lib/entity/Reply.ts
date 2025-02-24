import { Reactions } from '@/constants/types';
import { User } from './User';

export interface Reply {
  id: number;
  reactedWith: null | 'FIRE' | 'HEART' | 'COOL';
  reactionTypeMap: Reactions;
  time: string;
  user: User;
  text: string;
}
