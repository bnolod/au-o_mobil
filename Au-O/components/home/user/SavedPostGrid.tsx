/**
 * Elmentett posztokat megjelenítő komponens.
 * @module home/user/SavedPostGrid
 * @category Components
 */
import PostGrid from '@/components/social/base/PostGrid';
import LoadingModal from '@/components/ui/LoadingModal';
import { CommonStaticElementProps } from '@/constants/types';
import { getFavoritesOfUser } from '@/lib/ApiCalls/PostApiCalls';
import { Post } from '@/lib/entity/Post';
import { useEffect, useState } from 'react';
/**
 * Elmentett posztokat megjelenítő komponens.
 */
export default function SavedPostGrid({
  colorScheme,
  language,
  userId,
  refreshing,
}: {
  /**
   * A felhasználó azonosítója.
   */
  userId: number;
  /**
   * Frissítés állapota.
   */
  refreshing: boolean;
} & CommonStaticElementProps) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleFetch = async () => {
    const res = await getFavoritesOfUser(userId);
    setPosts(res);
    setLoading(false);
  };

  useEffect(() => {
    handleFetch();
  }, [refreshing, userId]);

  if (loading) {
    return <LoadingModal colorScheme={colorScheme} loading />;
  }

  return <PostGrid colorScheme={colorScheme} language={language} posts={posts!}></PostGrid>;
}
