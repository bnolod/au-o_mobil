import { router } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';
import { PostCreationTexts, PostStatusTexts } from '@/constants/texts';
import { Alert } from 'react-native';
import { deletePost } from '../ApiCalls/PostApiCalls';
export async function handleEdit(authorId: number | null, userId: number | null, postId: number | null) {
  if (postId && authorId && userId && authorId === userId) {
    router.push({ pathname: '/(post)/edit/[id]', params: { id: postId.toString() } });
  }
}
export async function handleReport() {
  console.log('report');
}
export async function handleShare(postId: number, language: 'HU' | 'EN') {
  await Clipboard.setStringAsync(postId.toString());
  Toast.show({
    type: 'success',
    text1: PostCreationTexts.copied[language],
    position: 'top',
    visibilityTime: 2000,
  });
}
export async function handleDelete(
  authorId: number | null,
  userId: number | null,
  language: 'HU' | 'EN',
  postId: number | null,
  onDelete?: () => void
) {
  if (authorId && userId && authorId === userId) {
    Alert.alert('Post deletion', 'Are you sure you want to delete this post?', [
      {
        text: PostStatusTexts.deletePrompt.buttons.cancel[language],
        style: 'cancel',
      },
      {
        text: PostStatusTexts.deletePrompt.buttons.delete[language],
        style: 'destructive',
        onPress: async () => {
          const res = await deletePost(postId!);
          if (res) {
            Toast.show({
              type: 'success',
              text1: PostStatusTexts.deletePrompt.success[language],
            });
            onDelete && onDelete();
          } else {
            Toast.show({
              type: 'error',
              text1: PostStatusTexts.deletePrompt.error[language],
            });
          }
        },
      },
    ]);
  }
}
