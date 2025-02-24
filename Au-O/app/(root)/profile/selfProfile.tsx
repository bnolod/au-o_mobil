import Profile from '@/components/home/user/Profile';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { apiFetch } from '@/lib/apiClient';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'nativewind';
import { useLanguage } from '@/contexts/LanguageContext';
import UserLoading from '@/components/auth/UserLoading';
import { User } from '@/lib/entity/User';
import { Car } from '@/lib/entity/Car';
import { Post } from '@/lib/entity/Post';
import { getOwnGarage } from '@/lib/ApiCalls/CarApiCalls';
import { getFollows } from '@/lib/ApiCalls/UserApiCalls';

export default function SelfProfile() {
  const { user } = useAuthentication();
  const { colorScheme } = useColorScheme();
  const [followers, setFollowers] = useState<User[]>();
  const [following, setFollowing] = useState<User[]>();
  const { language } = useLanguage();
  const [profile, setProfile] = useState<User>();
  const [garage, setGarage] = useState<Car[]>();
  const [posts, setPosts] = useState<Post[]>();
  if (user !== null && user !== undefined) {
    async function getUser() {
      const res = await apiFetch<User>(`users/user/${user!.id}`, 'GET', true);
      if (res && res.status === 200) {
        setProfile(res.data!);
        return res.data;
      } else return;
    }
    async function getUserPosts() {
      const res = await apiFetch<Post[]>(`users/user/${user!.id}/posts`, 'GET', true);
      if (res && res.data) {
        setPosts(res.data);
        return res.data;
      } else return;
    }
    async function getGarage() {
      const res = await getOwnGarage();
      if (res) {
        setGarage(res);
      }
    }
    useEffect(() => {
      getUser();
      getUserPosts();
      getGarage();
      getFollows(user.id.toString()).then((res) => {
        if (res) {
          setFollowers(res.followers as User[]);
          setFollowing(res.following as User[]);
        }
      });
    }, []);

    if (!profile || !posts || !followers || !following) {
      return <UserLoading />;
    }
    return (
      <Profile
        garage={garage!}
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
}
