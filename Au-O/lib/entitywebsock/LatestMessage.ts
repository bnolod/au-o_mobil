import { User } from '../entity/User';
import { ChatMessage } from './ChatMessage';
/**
 * Legutóbbi üzenet entitás
 * @extends User
 * @interface
 */
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
