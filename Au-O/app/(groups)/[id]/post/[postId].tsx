import LoadingModal from '@/components/ui/LoadingModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiFetch } from '@/lib/apiClient';
import { useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { PostStatusTexts } from '@/constants/texts';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { Post } from '@/lib/entity/Post';
import PostPage from '@/components/Post/base/PostPage';

export default function GroupPostIndex() {
  const { user } = useAuthentication();
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);
  const { id, postId, isNew } = useLocalSearchParams<{ id: string; postId: string, isNew?: string }>();
  async function getPost() {
    setLoading(true);
    const res = await apiFetch<Post>(`posts/post/${postId}`, 'GET', true);
    if (res && res.data) {
      setPost(res.data);
    }
    setLoading(false);
  }
  useEffect(() => {
    getPost()
  }, []);
  if (!post && loading)
    return <LoadingModal colorScheme={colorScheme!} loading={loading} text={PostStatusTexts.loading[language]} />;
  if (post !== null && user !== null && user !== undefined)
    return <PostPage colorScheme={colorScheme!} id={id} isNew={isNew} language={language} post={post} user={user} />;
}
