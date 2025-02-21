import { UserResponse } from "../response/UserResponse";
import { apiFetch } from "../apiClient";

export async function getFollows(
    userId: string
): Promise<{ following: UserResponse[]; followers: UserResponse[] } | null> {
    const followingRes = await apiFetch<UserResponse[]>(
        `users/user/${userId}/following`,
        "GET",
        true
    );
    const followersRes = await apiFetch<UserResponse[]>(
        `users/user/${userId}/followers`,
        "GET",
        true
    );
    if (followingRes && followersRes) {
        return {
            following: followingRes.data!,
            followers: followersRes.data!,
        };
    }
    return null;
}

export async function followUser(userId: string) {
    const res = await apiFetch<UserResponse>(
        `users/user/${userId}/follow`,
        "POST",
        true
    );
    if (res && res.status === 200) {
        return true;
    } else return false;
}
export async function unfollowUser(userId: string) {
    const res = await apiFetch<UserResponse>(
        `users/user/${userId}/unfollow`,
        "DELETE",
        true
    );
    if (res && res.status === 200) {
        return true;
    } else return false;
}

export async function removeFollow(followerId: string) {
    const req = await apiFetch(
        `users/user/${followerId}/remove_follower`,
        "DELETE",
        true
    );
    if (req && req.status === 200) {
        return true;
    }
    return false;
}
