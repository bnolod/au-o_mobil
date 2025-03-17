/**
 * Az alkalmazásban használt típusokat tartalmazó fájl
 * @module constants/types
 * @category Constants
 */
import { GestureResponderEvent } from 'react-native';
import { HttpErrorTexts } from './texts';
import { ReactNode } from 'react';

/**
 * Kezdőképernyő elrendezés tulajdonságai
 * @interface
 */
export interface OnboardingLayoutProps {
  /**
   * A fejléc szövege
   * @type {React.ReactNode}
   */
  headerText: React.ReactNode;
  /**
   * Főcím szövege
   * @type {string}
   */
  heroText: string;
  /**
   * Call-to-action szövege
   * @type {string}
   */
  ctaText: string;
  /**
   * Átugorható?
   * @type {Boolean}
   */
  skippable?: Boolean;
}
/**
 * Bejelentkezési kérelem
 * @interface
 */
export interface LoginRequest {
  /**
   * Felhasználónév vagy e-mail cím
   * @type {string}
   */
  usernameOrEmail: string;
  /**
   * Jelszó
   * @type {string}
   */
  password: string;
}
/**
 * Bejelentkezési válasz
 * @interface
 */
export interface LoginResponse {
  /**
   * Siker esetén JWT token
   */
  token?: string;
}
/**
 * Regisztrációs kérelem
 * @interface
 */
export interface RegisterRequest {
  /**
   * E-mail cím
   * @type {string}
   */
  email: string;
  /**
   * Jelszó
   * @type {string}
   */
  password: string;
  /**
   * Felhasználónév
   * @type {string}
   */
  username: string;
  /**
   * Becenév
   * @type {string}
   */
  nickname: string;
  /**
   * Születési dátum
   * @type {string}
   */
  dateOfBirth: string;
}
/**
 * HTTP metódusok
 * @type
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
/**
 * HTTP hiba interfész
 * @interface
 */
export interface IHttpError {
  /**
   * HTTP státuszkód
   * @type {number}
   */
  status: number;
  /**
   * Hibaüzenet
   * @type {string | undefined}
   */
  message?: string | undefined;
  /**
   * Nyelv
   * @type {'EN' | 'HU'}
   */
  language?: 'EN' | 'HU';
}
/**
 * HTTP hiba osztály
 * @class
 * @extends {IHttpError}
 */
export class HttpError implements IHttpError {
  /**
   * @param status HTTP státuszkód 
   * @param message HTTP hibaüzenet
   * @param language Nyelv
   */
  constructor(
    public status: number,
    public message?: string | undefined,
    public language: 'EN' | 'HU' = 'EN'
  ) {
    this.message = message || HttpErrorTexts[status as keyof typeof HttpErrorTexts][language];
    this.status = status;
  }
}
/**
 * Token válasz
 * @interface
 */
export type TokenResponse = {
  /**
   * JWT token
   * @type {string}
   */
  token: string;
};
/**
 * Modal állapot
 * @interface
 */
export interface ModalState {
  /**
   * Látható?
   * @type {boolean}
   */
  visible: boolean;
  /**
   * Tartalom
   * @type {React.ReactNode | null}
   */
  content: ReactNode | null;
  /**
   * GestureResponderEvent
   * @see {GestureResponderEvent}
   * @type {GestureResponderEvent | null}
   */
  event: GestureResponderEvent | null;
}
/**
 * Reakciók
 * @type
 */
export type Reactions = {
  /**
   * 🔥
   * @type {number}
   */
  FIRE: number;
  /**
   * 😍
   * @type {number}
   */
  HEART: number;
  /**
   * 😎
   * @type {number}
   */
  COOL: number;
};
/**
 * Általános statikus elem tulajdonságai
 * @interface
 */
export interface CommonStaticElementProps {
  /**
   * Elem tartalma
   * @type {React.ReactNode}
   */
  children?: ReactNode;
  /**
   * Nyelv
   * @type {'EN' | 'HU'}
   */
  language: 'EN' | 'HU';
  /**
   * Színválasztás
   * @type {'light' | 'dark'}
   */
  colorScheme: 'light' | 'dark';
}
/**
 * Reakció állapot
 * @interface
 */
export type ReactionState = {
  fire: number;
  heart: number;
  sunglasses: number;
};
/**
 * Poszt kártya lista elem tulajdonságai
 */
export interface PostCarouselElementProps {
  /**
   * Kép URL tömb 
   * @type {string[]}
   */
  images: string[];
  /**
   * Index
   * @type {number}
   */
  index: number;
}
/**
 * Poszt opció lista tulajdonságai
 * @interface
 */
export interface PostOptionMenuProps {
  /**
   * Poszt azonosító
   * @type {number}
   */
  preview: boolean;
  /**
   * Nyelv
   * @type {'EN' | 'HU'}
   */
  language: 'EN' | 'HU';
  /**
   * Poszt azonosító
   * @type {number}
   */
  postId: number;
  /**
   * Aktuális felhasználói azonosító
   * @type {number | null}
   */
  userId: number | null;
  /**
   * Szerző azonosító
   * @type {number | null}
   */
  authorId: number | null;
  /**
   * Törlés funkció
   * @callback
   * @type {() => void}
   */
  onDelete?: () => void;
}
/**
 * Autók érvényes típusai
 */
export type CarType =
  | 'SEDAN'
  | 'COUPE'
  | 'GRANDCOUPE'
  | 'HATCH'
  | 'KOMBI'
  | 'CABRIOLET'
  | 'PICKUP'
  | 'ROADSTER'
  | 'SUV';
