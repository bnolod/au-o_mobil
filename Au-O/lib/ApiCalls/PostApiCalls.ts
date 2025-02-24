import { ImageStoreRequest } from '@/constants/types';
import { apiFetch } from '../apiClient';

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