import { Reactions } from '@/constants/types';
import { User } from './User';
import { Reply } from './Reply';
/**
 * @param id Azonosító
 * @param time Időbélyeg
 * @param reactionTypeMap Reakció lehetőségek
 * @param reactedWith Adott reakció
 * @param user Adott felhasználó
 * @param text Komment szövege
 * @param replies Válaszok
 */
export interface Comment {
  id: number;
  time: string;
  reactionTypeMap: Reactions;
  reactedWith: null | 'FIRE' | 'HEART' | 'COOL';
  user: User;
  text: string;
  replies: Reply[] | null;
}
