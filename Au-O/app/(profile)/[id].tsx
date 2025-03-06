import { apiFetch } from '@/lib/apiClient';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import UserLoading from '@/components/auth/UserLoading';
import { useColorScheme } from 'nativewind';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import Profile from '@/components/home/user/Profile';
import { Car } from '@/lib/entity/Car';
import { User } from '@/lib/entity/User';
import { Post } from '@/lib/entity/Post';
import { getFollows, getUserById, getUserPostsById } from '@/lib/ApiCalls/UserApiCalls';
import { RefreshControl, ScrollView } from 'react-native';
import LoadingModal from '@/components/ui/LoadingModal';
import { getUserGarageById } from '@/lib/ApiCalls/CarApiCalls';

export default function UserProfile() {
  const [profile, setProfile] = useState<User>();
  const [garage, setGarage] = useState<Car[]>();
  const { language } = useLanguage();
  const { user } = useAuthentication();
  const { colorScheme } = useColorScheme();
  const { id } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  async function getUser() {
    const res = await getUserById(Number(id));
    if (res) {
      setProfile(res);
    } else return
  }
  async function getUserPosts() {
    const res = await getUserPostsById(Number(id));
    if (res) {
      setPosts(res);
    } else return;
  }
  async function getGarage(id: number) {
    const res = await getUserGarageById(id);
    if (res) {
      setGarage(res);
    } else return;
  }
  useEffect(() => {
    setProfile(undefined);
    getUser();
    getGarage(Number(id));
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
  }, [id, refreshing]);
  const isOwner = profile && user && profile.id.toString() === (id as string) && user.id === profile.id;
  if (isOwner === undefined) return <UserLoading />;
  if (user && profile !== undefined && profile !== null)
    return (
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={handleRefresh} refreshing={refreshing}>
            <LoadingModal colorScheme={colorScheme!} loading={refreshing} />
          </RefreshControl>
        }
        className="primary mx-auto"
      >
        <Profile
          garage={garage || []}
          user={user}
          profile={profile || ({} as User)}
          setFollowers={setFollowers}
          setFollowing={setFollowing}
          colorScheme={colorScheme || 'dark'}
          posts={posts!}
          followers={followers!}
          following={following!}
          id={profile.id.toString()}
          language={language}

        />
      </ScrollView>
    );
}
