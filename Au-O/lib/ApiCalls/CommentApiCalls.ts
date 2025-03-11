/**
 * Kommentekhez kapcsolódó API hívások
 * @module Au-O/lib/ApiCalls/CommentApiCalls
 * @category API
 */

import { apiFetch } from '../apiClient';
import { Comment } from '../entity/Comment';
/**
 * Hozzáfűz egy kommentet egy poszthoz
 * @async
 * @param {number} postId Poszt azonosítója 
 * @param {string} comment Komment szövege
 * @returns  {Promise<Comment | null>} A hozzáfűzött komment, vagy null
 */
export async function AddCommentToPost(postId: number, comment: string): Promise<Comment | null> {
  if (comment.length === 0) {
    return null;
  }
  const res = await apiFetch<Comment>(`posts/post/${postId}/comment`, 'POST', true, {
    text: comment,
  });
  if (res) return res.data;
  return null;
}
/**
 * Komment törlése
 * @async
 * @param {string} commentId Komment azonosítója
 * @returns {Promise<boolean>} Sikeres törlés esetén true, egyébként false
 */
export async function DeleteComment(commentId: string): Promise<boolean> {
  const res = await apiFetch(`/posts/post/comment/${commentId}`, 'DELETE', true);
  if (res?.status === 200) return true;
  else return false;
}

