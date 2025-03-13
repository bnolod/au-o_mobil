/**
 * Posztokhoz kapcsolódó API hívások
 * @module ApiCalls/PostApiCalls
 * @category API
 */
import { ImageStoreRequest } from '../request/ImgurRequest';
import { apiFetch } from '../apiClient';
import { Feed } from '../entity/Feed';
import { Post } from '../entity/Post';
/**
 * Poszt szerkesztése
 * @param text Leírás
 * @param location Helyszín
 * @param vehicleId Jármű azonosító
 * @param id Szerkesztendő poszt azonosító
 * @returns {Promise}
 * 
 */
export async function editPost(text: string, location: string, vehicleId: number | null, id: string) {
  const res = await apiFetch(`/posts/post/${id}`, 'PUT', true, {
    text,
    location,
    vehicleId,
  });
  if (res) {
    return res.data;
  } else return null;
}

/**
 * Poszt közzététele
 * @param {ImageStoreRequest} request Poszt adatai
 * @returns {Promise}
 * 
 */
export async function publishPost(request: ImageStoreRequest): Promise<any> {
  const res = await apiFetch('posts/post/user', 'POST', true, request);
  if (res) {
    return res.data;
  } else return null;
}
/**
 * Feed töltése
 * @param index Feed oldal indexe
 * @param timestamp Időbélyeg
 * @returns {Promise<Feed | null>} A feed, vagy null
 * 
 */
export async function loadFeed(index: number, timestamp: string) {
  const req = await apiFetch<Feed>(`posts/feed?page=${index}&time=${timestamp}`, 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Poszt törlése
 * @param postId Poszt azonosító
 * @returns {Promise<boolean>} Sikeres törlés esetén true, egyébként false
 * 
 */
export async function deletePost(postId: number) {
  const req = await apiFetch(`posts/post/${postId}`, 'DELETE', true);
  if (req && req.status === 200) {
    return true;
  }
  return false;
}
/**
 * Egy poszt betöltése
 * @param postId Lekérdezett poszt azonosítója
 * @returns {Promise<Post | null>} A poszt, vagy null
 * 
 */
export async function getPostById(postId: number) {
  const req = await apiFetch<Post>(`posts/post/${postId}`, 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Felhasználó elmentett posztjai
 * @param userId Felhasználó azonosítója
 * @returns {Promise<Post[] | null>} A posztok, vagy null
 * 
 */
export async function getFavoritesOfUser(userId: number) {
  const req = await apiFetch<Post[] | null>(`posts/favorites/user/${userId}`, 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}

/**
 * Poszt elmentése
 * @param postId Elmentendő poszt azonosítója
 * @returns {Promise<'added' | 'removed' | null>} Az eredmény, vagy null
 * 
 */
export async function favoritePost(postId: number) {
  const req = await apiFetch<'added' | 'removed'>(`posts/favorite/${postId}`, 'POST', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
