/**
 * Válaszokhoz kapcsolódó API hívások
 * @module ApiCalls/ReplyApiCalls
 * @category API
 */

import { apiFetch } from '../apiClient';
import { Reply } from '../entity/Reply';
/**
 * Válasz küldése egy posztra
 * @param commentId Komment azonosító
 * 
 * @param text Szöveg
 * @returns {Promise<Reply | null>} A válasz, vagy null
 */
export async function sendReply(commentId: string, text: string): Promise<Reply | null> {
  if (text.length === 0) return null;
  const res = await apiFetch<Reply>(`posts/post/comment/${commentId}/reply`, 'POST', true, {
    text,
  });
  if (res) return res.data;
  return null;
}
/**
 * Kitöröl egy választ
 * @param replyId Válasz azonosítója
 * 
 * @returns {Promise<boolean>} Sikeres törlés esetén true, egyébként false
 */
export async function deleteReply(replyId: number) {
  const res = await apiFetch<Reply>(`posts/post/comment/reply/${replyId}`, 'DELETE', true);
  return res?.status === 200 
  
}
