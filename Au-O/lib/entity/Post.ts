import { PostType, Reactions } from '@/constants/types';
import { Image } from './Image';
import { Car } from './Car';
import { Comment } from './Comment';
import { User } from './User';

export interface Post {
  dateOfCreation: string;
  dateOfUpdate: string;
  group: any;
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
