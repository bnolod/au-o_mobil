/**
 * Legutóbbi üzenet entitás
 * @module entity/LatestMessage
 * @category Websocket
 * @extends User
 * @interface
 */
import { User } from '../entity/User';
import { ChatMessage } from './ChatMessage';
export default interface LatestMessage extends User {
  /**
   * Aktív-e
   * @type {boolean}
   */
  active: boolean;
  /**
   * Üzenet
   * @type {ChatMessage}
   * @see ChatMessage
   */
  message: ChatMessage;
}
