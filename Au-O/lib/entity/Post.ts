import { Reactions } from '@/constants/types';
import { Image } from './Image';
import { Car } from './Car';
import { Comment } from './Comment';
import { User } from './User';
import { Group } from './Group';

export interface Post {
  dateOfCreation: string;
  dateOfUpdate: string;
  group: Group | null;
  images: Image[];
  location: string;
  postId: number;
  postType: PostType;
  reactionTypeMap: Reactions;
  text: string;
  user: User;
  comments: Comment[];
  reactedWith: null | 'FIRE' | 'HEART' | 'COOL';
  vehicle: Car | null;
}
export type PostType = 'USERPOST' | 'GROUPOST' | 'EVENTPOST';

