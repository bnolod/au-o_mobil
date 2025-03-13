/**
 * Chat üzenetek típusa
 * @module entity/ChatMessage
 * @category Websocket
 * @interface
 * 
 */
export interface ChatMessage {
  /**
   * Üzenet
   * @type {string}
   */
  message: string;
  /**
   * Felhasználó adatai
   * @type {object}
   * @property {string} username Felhasználó felhasználóneve
   */
  user: {
    username: string;
  };
}
