/**
 * Reakcióhoz kapcsolódó API hívások
 * @module ApiCalls/ReactionApiCalls
 * @category API
 */

import { apiFetch } from '../apiClient';
/**
 * Reagál egy elemre
 * @param target Post, Comment vagy Reply
 * @param postId Cél azonosítója
 * @param reaction Kívánt reakció
 * 
 * @returns {Promise<boolean>} Sikeres reakció esetén true, egyébként false
 */
export async function addReaction(
  target: 'post' | 'comment' | 'reply',
  postId: number,
  reaction: null | 'FIRE' | 'HEART' | 'COOL'
) {
  if (!reaction) {
  }
  const res = await apiFetch(`posts/${target}/${postId}/addOrRemoveReaction/${reaction}`, 'POST');

  return res?.status === 200;
}
