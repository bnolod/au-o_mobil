import { apiFetch } from '../apiClient';
import { Post } from '../entity/Post';
import { User } from '../entity/User';

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

export async function followUser(userId: string) {
  const res = await apiFetch<User>(`users/user/${userId}/follow`, 'POST', true);
  if (res && res.status === 200) {
    return true;
  } else return false;
}
export async function unfollowUser(userId: string) {
  const res = await apiFetch<User>(`users/user/${userId}/unfollow`, 'DELETE', true);
  if (res && res.status === 200) {
    return true;
  } else return false;
}

export async function removeFollow(followerId: string) {
  const req = await apiFetch(`users/user/${followerId}/remove_follower`, 'DELETE', true);
  if (req && req.status === 200) {
    return true;
  }
  return false;
}

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

export async function getUserById(id: number) {
  const res = await apiFetch<User | null | undefined>(`users/user/${id}`, 'GET', true);
  if (res && res.data) {
    return res.data
  } else return null;
}
export async function getUserPostsById(id: number) {
  const res = await apiFetch<Post[]>(`users/user/${id}/posts`, 'GET', true);
  if (res && res.data) {
    return res.data
  } else return;
}


export async function updateBio(bio: string) {
  const req = await apiFetch<null>('users/user/update', 'PUT', true, {
    bio,
  });
  if (req && req.status === 200) {
    return true;
  }
  return false;
}

export async function updateNickname(nickname: string) {
  const req = await apiFetch<null>('users/user/update', 'PUT', true, {
    nickname,
  });
  if (req && req.status === 200) {
    return true;
  }
  return false;
}
