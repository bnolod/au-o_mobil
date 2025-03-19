import LoadingModal from '@/components/ui/LoadingModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiFetch } from '@/lib/apiClient';
import { router, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { generalTexts, PostStatusTexts } from '@/constants/texts';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { Post } from '@/lib/entity/Post';
import PostPage from '@/components/Post/base/PostPage';
import ThemedText from '@/components/ui/ThemedText';

export default function PostIdPage() {
  const { user } = useAuthentication();
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);
  const { id, isNew } = useLocalSearchParams<{ id: string; isNew?: string }>();
  async function getPost() {
    setLoading(true);
    const res = await apiFetch<Post>(`posts/post/${id}`, 'GET', true);
    if (res && res.data) {
      setPost(res.data);
    }
    setLoading(false);
  }
  useEffect(() => {
    getPost()
  }, []);
  function showShareModal() {
    if (Boolean(isNew)) {
      Alert.alert(PostStatusTexts.newShare.title[language], PostStatusTexts.newShare.message[language], [
        {
          text: generalTexts.responses.no[language],
          style: 'cancel',
        },
        {
          isPreferred: true,
          text: generalTexts.responses.yes[language],
          onPress: async () => {
            await Clipboard.setStringAsync(post!.postId.toString());
          },
        },
      ]);
    }
  }
  if (!post && loading) return <ThemedText>Loading...</ThemedText>;
  if (post !== null && user !== null && user !== undefined)
    return <PostPage colorScheme={colorScheme!} id={id} isNew={isNew} language={language} post={post} user={user} />;
}
