import { User } from '../entity/User';
import { ChatMessage } from './ChatMessage';
/**
 * @extends User
 * @param active Felhasználó online
 * @param message Utolsó elküldött üzenet
 */
export default interface LatestMessage extends User {
  active: boolean;
  message: ChatMessage;
}
