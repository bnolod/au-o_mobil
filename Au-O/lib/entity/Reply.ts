import { Reactions } from '@/constants/types';
import { User } from './User';
/**
 * @param id Azonosító
 * @param time Időbélyeg
 * @param user Feladó felhasználó
 * @param text Válasz szövege
 * @param reactedWith: Adott reakció
 * @param reactionTypeMap: Reakciós lehetőségek
 */
export interface Reply {
  id: number;
  reactedWith: null | 'FIRE' | 'HEART' | 'COOL';
  reactionTypeMap: Reactions;
  time: string;
  user: User;
  text: string;
}
