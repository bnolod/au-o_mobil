/**
 * Poszt alap elemek tulajdonságai
 * @module post/base/props
 * @category Components
 */
import { Car } from '@/lib/entity/Car';
import { Group } from '@/lib/entity/Group';
import { SocialEvent } from '@/lib/entity/SocialEvent';
import { User } from '@/lib/entity/User';
/**
 * Poszt jármű banner elemek
 * @interface
 */
export interface PostVehicleBannerProps {
  /**
   * Előnézet?
   * @type {boolean}
   */
  preview: boolean;
  /**
   * Jármű
   * @type {Car}
   * @see {Car}
   */
  vehicle: Car;
}
/**
 * Poszt megjelenítés elemek tulajdonságai
 * @interface
 */
export interface PostDispayElementProps {
  /**
   * Gombnyomás
   * @returns {void}
   */
  onPress: () => void;
  /**
   * Poszt típus
   * @type {string}
   */
  postType: string;
  /**
   * Színséma
   * @type {'light' | 'dark'}
   */
  colorScheme: 'light' | 'dark';
  /**
   * Szerző becenév
   * @type {string}
   */
  authorNickname: string;
  /**
   * Szerző profilkép
   * @type {string}
   */
  authorProfileImg: string;
  /**
   * Szerző felhasználónév
   * @type {string}
   */
  authorUsername: string;
  /**
   * Csoport
   * @type {Group | null}
   * @see {Group}
   */
  group: Group | null;
  /**
   * Esemény
   * @type {SocialEvent | null}
   * @deprecated
   * @see {SocialEvent}
   */
  event: SocialEvent | null;
}
/**
 * Poszt lábléc elemek tulajdonságai
 * @interface
 */
export interface PostFooterProps {
  /**
   * Reakciók
   * @type {Reactions}
   * @see {Reactions}
   */
  currentReaction: 'FIRE' | 'HEART' | 'COOL' | null;
  /**
   * Reakció állapot
   * @type {{ FIRE: number; HEART: number; COOL: number }}
   */
  reactionState: { FIRE: number; HEART: number; COOL: number };
  /**
   * Előnézet?
   * @type {boolean}
   */
  preview: boolean;
  /**
   * Gombnyomás
   * @param {Reactions} type Típus 
   * @returns 
   */
  handlePress: (type: 'FIRE' | 'HEART' | 'COOL' | null) => void;
  /**
   * helyszín
   * @type {string}
   */
  location: string;
  /**
   * Dátum
   * @type {string}
   */
  date: string;
  /**
   * 
   */
  authorId: number | null;
  /**
   * Szerző becenév
   * @type {string}
   */
  authorNickname: string;
  /**
   * Szerző profilkép
   * @type {string}
   */
  authorProfileImg: string;
  /**
   * Szerző felhasználónév
   * @type {string}
   */
  authorUsername: string;
  /**
   * Kommentek
   */
  comments: any;
  /**
   * Leírás
   * @type {string}
   */
  description: string;
  /**
   * Poszt azonosító
   */
  postId: number;
  /**
   * Felhasználó
   */
  user: User;
}
