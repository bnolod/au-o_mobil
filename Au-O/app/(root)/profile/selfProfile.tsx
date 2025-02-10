import Profile from "@/components/home/Profile";
import { PostResponse, User, UserResponse } from "@/constants/types";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { apiFetch, getFollows } from "@/lib/apiClient";
import { useEffect, useState } from "react";
import { useColorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import UserLoading from "@/components/auth/UserLoading";

export default function SelfProfile() {
  const { user } = useAuthentication();
  const {colorScheme} = useColorScheme();
    const [followers, setFollowers] = useState<User[]>();
    const [following, setFollowing] = useState<User[]>();
    const {language} = useLanguage()
  const [profile, setProfile] = useState<UserResponse>();
    const [posts, setPosts] = useState<PostResponse[]>();
  if (user !== null && user !== undefined) {
    async function getUser() {
      const res = await apiFetch<UserResponse>(
        `users/user/${user!.id}`,
        "GET",
        true
      );
      if (res && res.status === 200) {
        setProfile(res.data);
        return res.data;
      } else return;
    }
    async function getUserPosts() {
      const res = await apiFetch<PostResponse[]>(
        `users/user/${user!.id}/posts`,
        "GET",
        true
      );
      if (res && res.data) {
        setPosts(res.data);
        return res.data;
      } else return;
    }
    useEffect(() => {
      getUser();
        getUserPosts();
        getFollows(user.id.toString()).then((res) => {
            if (res) {
              setFollowers(res.followers as User[]);
              setFollowing(res.following as User[]);
            }
          });
    },
     []);
    
    if (!profile || !posts || !followers || !following) {
        return <UserLoading />;
    }
    return <Profile user={user} profile={profile || {} as User} setFollowers={setFollowers} setFollowing={setFollowing} colorScheme={colorScheme!} posts={posts!} followers={followers!} following={following!} id={user.id.toString()} language={language}  />;
  }
}
