import PostCard from '@/components/Post/Post';
import Button from '@/components/ui/Button';
import LoadingModal from '@/components/ui/LoadingModal';
import ThemedText from '@/components/ui/ThemedText';
import { Colors } from '@/constants/Colors';
// import { PostResponse } from "@/constants/types";
import { useLanguage } from '@/contexts/LanguageContext';
import { apiFetch } from '@/lib/apiClient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
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
  function showShareModal() {
    if (Boolean(isNew)) {
      Alert.alert(PostStatusTexts.newShare.title[language], PostStatusTexts.newShare.message[language], [
        {
          text: PostStatusTexts.newShare.responses.no[language],
          style: 'cancel',
        },
        {
          isPreferred: true,
          text: PostStatusTexts.newShare.responses.yes[language],
          onPress: async () => {
            await Clipboard.setStringAsync(post!.postId.toString());
          },
        },
      ]);
    }
  }
  if (!post && loading)
    return <LoadingModal colorScheme={colorScheme!} loading={loading} text={PostStatusTexts.loading[language]} />;
  if (post !== null && user !== null && user !== undefined)
    return <PostPage colorScheme={colorScheme!} id={id} isNew={isNew} language={language} post={post} user={user} />;
}
