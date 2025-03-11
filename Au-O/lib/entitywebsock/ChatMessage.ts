/**
 * @param message Üzenet
 * @param user Felhasználó adatai
 */
export interface ChatMessage {
  message: string;
  user: {
    username: string;
  };
}
