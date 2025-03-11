import { Reactions } from '@/constants/types';
import { Image } from './Image';
import { Car } from './Car';
import { Comment } from './Comment';
import { User } from './User';
import { Group } from './Group';
/**
 * @description A poszt létrehozásához szükséges adatok
 * @param userId A poszt készítőjének azonosítója
 * @param description Poszt leírása
 * @param images Poszt képei
 * @param group Opcionális csoport
 * @param location Poszt helyszíne
 * @param event Opcionális esemény 
 * @param vehicle Opcionális jármű 
 * @param postType Poszt típusa
 * @param comments Kommentek
 * @param reactedWith: Adott reakció
 * @param reactionTypeMap: Reakciós lehetőségek
 * @param favorite: Elmentett poszt
 * @param dateOfCreation Poszt létrehozásának dátuma
 * @param dateOfUpdate Poszt módosításának dátuma
 */
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
  favorite: boolean;
}
export type PostType = 'USERPOST' | 'GROUPOST' | 'EVENTPOST';

