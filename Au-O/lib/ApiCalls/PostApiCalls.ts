import { ImageStoreRequest } from '../request/ImgurRequest';
import { apiFetch } from '../apiClient';
import { Feed } from '../entity/Feed';

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
 * Posztol egy posztot.
 * @example
 *
 * ```
 * Posztol posztot :)
 * ```
 * @returns
 * Posztol egy posztot majd visszatér a poszt adataival.
 */
export async function publishPost(request: ImageStoreRequest): Promise<any> {
  const res = await apiFetch('posts/post/user', 'POST', true, request);
  if (res) {
    return res.data;
  } else return null;
}

export async function loadFeed(index: number, timestamp: string) {
  const req = await apiFetch<Feed>(`posts/feed?page=${index}&time=${timestamp}`, 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
export async function deletePost(postId: number) {
   const req = await apiFetch(`posts/post/${postId}`, 'DELETE', true);
    if (req && req.status === 200) {
      return true;
    }
    return false;
}