/**
 * Válasz entitások
 * @category Entity
 * @module entity/Reply
 */
import { Reactions } from '@/constants/types';
import { User } from './User';
/**
 * Válasz entitás
 * @interface
 */
export interface Reply {
  /**
   * Azonosító
   * @type {number}
   */
  id: number;
  /**
   * Adott reakció
   * @type {null | 'FIRE' | 'HEART' | 'COOL'}
   */
  reactedWith: null | 'FIRE' | 'HEART' | 'COOL';
  /**
   * Reakció lehetőségek
   * @type {Reactions}
   */
  reactionTypeMap: Reactions;
  /**
   * Időbélyeg
   * @type {string}
   */
  time: string;
  /**
   * Feladó felhasználó
   * @type {User}
   */
  user: User;
  /**
   * Válasz szövege
   * @type {string}
   */
  text: string;
}
