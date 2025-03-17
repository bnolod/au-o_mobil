/**
 * Komment entitások
 * @category Entity
 * @module entity/Comment
 */

import { Reactions } from '@/constants/types';
import { User } from './User';
import { Reply } from './Reply';
/**
  * Komment entitás
  * @interface
 */
export interface Comment {
  /**
   * Azonosító
   * @type {number}
   */
  id: number;
  /**
   * Időbélyeg
   * @type {string}
   */
  time: string;
  /**
   * Reakció lehetőségek
   * @type {Reactions}
   */
  reactionTypeMap: Reactions;
  /**
   * Adott reakció
   * @type {null | 'FIRE' | 'HEART' | 'COOL'}
   */
  reactedWith: null | 'FIRE' | 'HEART' | 'COOL';
  /**
   * Felhasználó
   * @type {User}
   */
  user: User;
  /**
   * Komment szövege
   * @type {string}
   */
  text: string;
  /**
   * Válaszok
   * @type {Reply[] | null}
   */
  replies: Reply[] | null;
}
