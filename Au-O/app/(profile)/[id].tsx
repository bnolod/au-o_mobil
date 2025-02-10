import {
  apiFetch,
  followUser,
  getFollows,
  unfollowUser,
} from "@/lib/apiClient";
import {
  PostResponse,
  User,
  UserResponse,
} from "@/constants/types";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import UserLoading from "@/components/auth/UserLoading";
import { useColorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import Profile from "@/components/home/Profile";
export default function UserProfile() {
  const [profile, setProfile] = useState<User>();
  const { language } = useLanguage();
  const { user } = useAuthentication();
  const { colorScheme } = useColorScheme();
  const { id } = useLocalSearchParams();

  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [posts, setPosts] = useState<PostResponse[]>([]);
  
  async function getUser() {
    const res = await apiFetch<UserResponse>(`users/user/${id}`, "GET", true);
    if (res && res.data) {
      setProfile(res.data);
    } else return;
  }
  async function getUserPosts() {
    const res = await apiFetch<PostResponse[]>(
      `users/user/${id}/posts`,
      "GET",
      true
    );
    if (res) {
      setPosts(res.data!);
    } else return;
  }
  useEffect(() => {
    setProfile(undefined);
    getUser();
    getUserPosts();
    getFollows(id as string).then((res) => {
      if (res) {
        setFollowers(res.followers as User[]);
        setFollowing(res.following as User[]);
      }
    });
    () => {
      setProfile(undefined);
    };
  }, [id]);
  const isOwner =
    profile &&
    user &&
    profile.id.toString() === (id as string) &&
    user.id === profile.id;
  if (isOwner === undefined) return <UserLoading />;
  if (user && profile !== undefined && profile !== null)
    return (
      <Profile
        user={user}
        profile={profile || ({} as User)}
        setFollowers={setFollowers}
        setFollowing={setFollowing}
        colorScheme={colorScheme!}
        posts={posts!}
        followers={followers!}
        following={following!}
        id={user.id.toString()}
        language={language}
      />
    );
}
