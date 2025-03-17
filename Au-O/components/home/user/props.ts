/**
 * Profil komponens propok
 * @module home/user/props
 * @category Components
 */
import { Car } from '@/lib/entity/Car';
import { Post } from '@/lib/entity/Post';
import { User } from '@/lib/entity/User';
/**
 * Követők sheet propok
 * @interface
 */
export interface FollowerSheetProps {
  /**
   * Követők
   * @type {User[]}
   */
  followers: User[];
  /**
   * Követettek
   * @type {User[]}
   */
  following: User[];
  /**
   * Sheet elrejtése
   * @returns {void}
   */
  dismissSheet: () => void;
  /**
   * Tulajdonos?
   * @type {boolean}
   */
  isOwner: boolean;
}
/**
 * Profil komponens propok
 * @interface
 */
export interface ProfileProps {
  /**
   * Felhasználó
   * @type {User}
   */
  user: User;
  /**
   * Felhasználó profilja
   * @type {User}
   */
  profile: User;
  /**
   * Felhasználó azonosító
   * @type {string}
   */
  id: string;
  /**
   * Frissítés állapota
   * @type {boolean}
   */
  refreshing: boolean;
  /**
   * Garázs
   * @type {Car[]}
   */
  garage: Car[];
  /**
   * Követők
   */
  followers: User[];
  /**
   * Követettek
   */
  following: User[];
  /**
   * Követők beállítása
   * @param users FElhasználók
   * @returns {void}
   */
  setFollowing: (users: User[]) => void;
  /**
   * Követettek beállítása
   * @param users FElhasználók
   * @returns {void}
   */
  setFollowers: (users: User[]) => void;
  /**
   * Posztok
   */
  posts: Post[];
}
/**
 * Profil fül választó propok
 * @type
 */
export type TabOptions = 'SAVED' | 'POST' | 'GARAGE' | 'GROUPS';
/**
 * Profil fül választó propok
 * @interface
 */
export interface ProfileTabSelectorProps {
  /**
   * Színséma
   * @type {"light" | "dark"}
   */
  colorScheme: 'light' | 'dark';
  /**
   * Kiválasztott fül
   * @type {TabOptions}
   */
  selectedTab: TabOptions;
  /**
   * Fül kiválasztása
   * @param tab Fül
   * @returns {void}
   */
  setSelectedTab: (tab: TabOptions) => void;
}
/**
 * Saját csoportok listája propok
 * @interface
 */
export interface OwnGroupListProps {
    /**
     * Felhasználó ID
     * @type {number}
     */
  userId: number;
  /**
   * Frissítés állapota
   * @type {boolean}
   */
  refreshing: boolean;
}