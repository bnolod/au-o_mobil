/**
 * Felhasználókhoz kapcsolódó API hívások
 * @module ApiCalls/UserApiCalls
 * @category API
 */

import { apiFetch } from '../apiClient';
import { Post } from '../entity/Post';
import { User } from '../entity/User';
/**
 * Felhasználói kapcsolatok lekérdezése
 * 
 * @param userId Felhasználó azonosítója
 * @returns {Promise<{ following: User[]; followers: User[] } | null>} A felhasználó által követett és követő felhasználók, vagy null
 */
export async function getFollows(userId: string): Promise<{ following: User[]; followers: User[] } | null> {
  const followingRes = await apiFetch<User[]>(`users/user/${userId}/following`, 'GET', true);
  const followersRes = await apiFetch<User[]>(`users/user/${userId}/followers`, 'GET', true);
  if (followingRes && followersRes) {
    return {
      following: followingRes.data!,
      followers: followersRes.data!,
    };
  }
  return null;
}
/**
 * Felhasználó követése
 * 
 * @param userId Felhasználó azonosítója
 * @returns {Promise<boolean>}
 */
export async function followUser(userId: string) {
  const res = await apiFetch<User>(`users/user/${userId}/follow`, 'POST', true);
  if (res && res.status === 200) {
    return true;
  } else return false;
}
/**
 * Felhasználó kikövetése
 * 
 * @param userId Felhasználó azonosítója
 * @returns {Promise<boolean>}
 */
export async function unfollowUser(userId: string) {
  const res = await apiFetch<User>(`users/user/${userId}/unfollow`, 'DELETE', true);
  if (res && res.status === 200) {
    return true;
  } else return false;
}
/**
 * Felhasználó követésének eltávolítása
 * 
 * @param followerId Felhasználó azonosítója
 * @returns {Promise<boolean>}
 */

export async function removeFollow(followerId: string) {
  const req = await apiFetch(`users/user/${followerId}/remove_follower`, 'DELETE', true);
  if (req && req.status === 200) {
    return true;
  }
  return false;
}
/**
 * Saját profil lekérdezése
 * @param token JWT token
 * @returns {Promise<User | null | undefined>} A felhasználó, vagy null
 * 
 */
export async function getUser(token: string): Promise<User | null | undefined> {
  try {
    if (!token) {
      return null;
    }
    const user = await apiFetch<User>('auth/profile', 'GET', true);
    if (user) {
      return user.data;
    } else return null;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}
/**
 * Felhasználó lekérdezése azonosító alapján
 * @param id Felhasználó azonosítója
 * 
 * @returns {Promise<User | null | undefined>} A felhasználó, vagy null
 */
export async function getUserById(id: number) {
  const res = await apiFetch<User | null | undefined>(`users/user/${id}`, 'GET', true);
  if (res && res.data) {
    return res.data
  } else return null;
}
/**
 * Felhasználó posztjainak lekérdezése
 * @param id Felhasználó azonosítója
 * 
 * @returns {Promise<Post[] | undefined>} A posztok, vagy undefined
 */
export async function getUserPostsById(id: number) {
  const res = await apiFetch<Post[]>(`users/user/${id}/posts`, 'GET', true);
  if (res && res.data) {
    return res.data
  } else return;
}

/**
 * Felhasználói bio frissítése
 * @param bio Bio szövege
 * @returns {Promise<boolean>} Frissítés sikeressége
 * 
 */
export async function updateBio(bio: string) {
  const req = await apiFetch<null>('users/user/update', 'PUT', true, {
    bio,
  });
  if (req && req.status === 200) {
    return true;
  }
  return false;
}
/**
 * Becenév frissítése
 * @param nickname Becenév
 * @returns {Promise<boolean>} Frissítés sikeressége
 */
export async function updateNickname(nickname: string) {
  const req = await apiFetch<null>('users/user/update', 'PUT', true, {
    nickname,
  });
  return  req?.status === 200 

}
