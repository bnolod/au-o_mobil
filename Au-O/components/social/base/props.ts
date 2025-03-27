/**
 * Közösségi tulajdonságok
 * @module social/base/props
 * @category Props
 */
import { Group } from "@/lib/entity/Group";
import { SocialEvent } from "@/lib/entity/SocialEvent";

/**
 * Új közösségi tulajdonságok
 * @interface NewSocialProps
 */
export interface NewSocialProps {
  /**
   * Szöveg
   * @type {string}
   */
  text: string;

  /**
   * Kattintási esemény
   * @returns {void}
   * 
   */
  onPress?: () => void;
}

/**
 * Közösségi banner tulajdonságok
 * @interface SocialBannerProps
 */
export interface SocialBannerProps {
  /**
   * Név
   * @type {string}
   */
  name: string;

  /**
   * Azonosító
   * @type {number}
   */
  id: number;

  /**
   * Fejléc?
   * @type {boolean}
   * 
   */
  header?: boolean;

  /**
   * Kép URL
   * @type {string}
   * 
   */
  image?: string;

  /**
   * Típus
   * @type {'GROUP' | 'EVENT'}
   * 
   */
  type?: 'GROUP' | 'EVENT';

  /**
   * Kattintási esemény
   * @returns {void}
   * 
   */
  onPress?: () => void;

  /**
   * Számláló
   * @type {number | null}
   * 
   */
  count?: number | null;
}

/**
 * Közösségi rendezési elem tulajdonságok
 * @interface SocialSortItemProps
 */
export interface SocialSortItemProps {
  /**
   * Banner kép URL
   * @type {string | null}
   */
  bannerImage: string | null;

  /**
   * Név
   * @type {string}
   */
  name: string;

  /**
   * Tagok száma
   * @type {number}
   */
  memberCount: number;

  /**
   * Kiválasztási esemény
   * @returns {void}
   */
  onSelect: () => void;

  /**
   * Színséma
   * @type {'light' | 'dark'}
   */
  colorScheme: 'light' | 'dark';
  /**
   * Alias
   * @type {string | undefined}
   */
  alias?: string; 
}

/**
 * Közösségi kártya tulajdonságok
 * @interface SocialCardProps
 */
export interface SocialCardProps {
  /**
   * Csoport
   * @type {Group}
   * 
   */
  group?: Group;

  /**
   * Esemény
   * @type {SocialEvent}
   * 
   */
  event?: SocialEvent;

  /**
   * Előnézet
   * @type {'CREATE' | 'DISPLAY' | undefined}
   * 
   */
  preview?: 'CREATE' | 'DISPLAY' | undefined;

  /**
   * Típus
   * @type {'GROUP' | 'EVENT'}
   */
  type: 'GROUP' | 'EVENT';

  /**
   * Létrehozási esemény
   * @returns {void}
   * 
   */
  onCreatePress?: () => void;
}