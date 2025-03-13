/**
 * Chat komponensekhez szükséges propok
 * @module chat/props
 * @category Components
 */
import { User } from '@/lib/entity/User';
import LatestMessage from '@/lib/entitywebsock/LatestMessage';
/**
 * Csoport üzenet komponens propjai
 * @interface GroupMessageProps
 */
export interface GroupMessageProps {
  /**
   * Felhasználó
   * @type {User}
   * @see User
   */
  user: User;
  /**
   * Küldő
   * @type {User}
   * @see User
   */
  sender: User;
  /**
   * Üzenet
   * @type {string}
   */
  message: string;
  /**
   * Dátum
   * @type {string}
   */
  date: string;
}
/**
 * Csoport üzenet komponens propjai
 * @interface GroupMessageProps
 */
export interface DirectMessageItemProps {
  /**
   * Felhasználó
   * @type {User}
   * @see User
   */
  user: User;
  /**
   * Legutóbbi üzenet
   * @type {LatestMessage}
   * @see LatestMessage
   */
  latestMessage: LatestMessage;
  /**
   * Dátum
   * @type {string}
   */
  date: string;
}
/**
 * Chat fejléc propjai
 * @interface ChatHeaderProps
 */
export interface ChatHeaderProps {
  /**
   * Felhasználó
   * @type {User}
   * @see User
   */
  user: User;
  /**
   * Szűrő változás callback
   * @callback
   * @param {string} text Szűrő szöveg
   * @returns {void}
   */
  onFilterChange: (text: string) => void;
  /**
   * Szűrő szöveg
   * @type {string}
   * @default "EN"
   */
  language: "EN" | "HU";
  /**
   * Főoldalon van?
   * @type {boolean}
   * @default false
   */
  mainPage: boolean;
}
/**
 * Üzenetek oldal propjai
 * @interface DirectMessagePageProps
 */
export interface DirectMessagePageProps {
  /**
   * Felhasználó
   * @type {User}
   * @see User
   */
    user: User;
  /**
   * Címzett
   * @type {User}
   * @see User
   */
    recipient: User;
    /**
     * Nyelv
     * @type {"EN" | "HU"}
     * @default "EN"
     */
    language: "EN" | "HU";
    /**
     * Színséma
     * @type {"dark" | "light"}
     */
    colorScheme: "dark" | "light";
}
/**
 * Üzenetek oldal propjai
 * @interface GroupMessagePageProps
 */
export interface MessageProps {
  /**
   * Profilkép
   * @type {string}
   * @default ""
   */
    profilePic: string;
    /**
     * Színséma
     * @type {"dark" | "light"}
     * @default "dark"
     */
    colorScheme: "dark" | "light";
    /**
     * Azonosító
     * @type {number}
     */
    id: number;
    /**
     * Becenév
     * @type {string}
     */
    nickname: string
    /**
     * Üzenet
     * @type {string}
     */
    message: string;
    /**
     * Első üzenet
     * @type {boolean}
     */
    isFirst: boolean
    /**
     * Utolsó üzenet
     * @type {boolean}
     */
    isLast: boolean
}
export interface MessageBarProps {
  /**
   * Szöveg
   * @type {string}
   */
    text: string,
    /**
     * Nyelv
     * @type {"EN" | "HU"}
     */
    language: "EN" | "HU",
    /**
     * Küldés callback
     * @callback
     * @returns {void}
     */
    onSend: () => void;
    /**
     * Szöveg változás callback
     * @callback
     * @param {string} text Szöveg
     * @returns {void}
     */
    onChange: (text: string
    ) => void
}