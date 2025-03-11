import { Reactions } from '@/constants/types';
import { Image } from './Image';
import { Car } from './Car';
import { Comment } from './Comment';
import { User } from './User';
import { Group } from './Group';
/**
 *  A poszt létrehozásához szükséges adatok
@interface
 */
export interface Post {
  /**
   * A poszt azonosítója
   * @type {number}
   */
  postId: number;
  /**
   * A poszt létrehozásának dátuma
   * @type {string}
   */
  dateOfCreation: string;
  /**
   * A poszt módosításának dátuma
   * @type {string}
   */
  dateOfUpdate: string;
  /**
   * A poszthoz tartozó csoport
   * @type {Group | null}
   */
  group: Group | null;
  /**
   * A poszthoz tartozó képek
   * @type {Image[]}
   */
  images: Image[];
  /**
   * A poszt helyszíne
   * @type {string}
   */
  location: string;
  /**
   * A poszt típusa
   * @type {PostType}
   */
  postType: PostType;
  /**
   * Reakciós lehetőségek
   * @type {Reactions}
   */
  reactionTypeMap: Reactions;
/**
 * A poszt leírása
 * @type {string}
 */
  text: string;
  /**
   * A poszt készítője
   * @type {User}
   */
  user: User;
  /**
   * Kommentek
   * @type {Comment[]}
   */
  comments: Comment[];
  /**
   * Adott reakció
   * @type {null | 'FIRE' | 'HEART' | 'COOL'}
   */
  reactedWith: null | 'FIRE' | 'HEART' | 'COOL';
  /**
   * A poszthoz tartozó jármű
   * @type {Car | null}
   */
  vehicle: Car | null;
  /**
   * Mentési státusz
   * @type {boolean}
   */
  favorite: boolean;
}
export type PostType = 'USERPOST' | 'GROUPOST' | 'EVENTPOST';

