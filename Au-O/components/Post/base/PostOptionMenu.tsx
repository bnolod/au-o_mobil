import React from 'react';
import { PostCreationTexts, PostStatusTexts } from '@/constants/texts';
import { ActionSheetIOS, Alert, Modal, Platform, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { apiFetch, deleteImgurImage } from '@/lib/apiClient';
export default function PostOptionMenu(
  preview: boolean,
  language: 'EN' | 'HU',
  postId: number,
  userId: number | null,
  authorId: number | null,
  onDelete?: () => void
) {
  if (preview) return null;
  let iosOptions = [
    PostCreationTexts.options.cancel[language],
    PostCreationTexts.options.share[language],
    PostCreationTexts.options.report[language],
  ];
  if (authorId && authorId === userId) {
    iosOptions.push(PostCreationTexts.options.edit[language], PostCreationTexts.deletePost[language]);
  }
  async function handleShare() {
    await Clipboard.setStringAsync(postId.toString());
    Toast.show({
      type: 'success',
      text1: PostCreationTexts.copied[language],
      position: 'top',
      visibilityTime: 2000,
    });
  }
  async function handleReport() {
    console.log('report');
  }
  async function handleEdit() {
    if (authorId && userId && authorId === userId) {
      router.push({ pathname: '/(post)/edit/[id]', params: { id: postId.toString() } });
    }
  }
  async function handleDelete() {
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
            const res = await apiFetch(`posts/post/${postId}`, 'DELETE', true);
            if (res && res.status === 200) {
              Toast.show({
                type: 'success',
                text1: PostStatusTexts.deletePrompt.success[language],
              });
              if (onDelete) onDelete();
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

  if (Platform.OS === 'ios') {
    return ActionSheetIOS.showActionSheetWithOptions(
      {
        options: iosOptions,

        cancelButtonIndex: 0,
        destructiveButtonIndex: 4,
        title: PostStatusTexts.options.title[language],
      },
      async (buttonIndex) => {
        if (buttonIndex === 1) {
          await handleShare();
        }
        if (buttonIndex === 2) {
          await handleReport();
        }
        if (buttonIndex === 3) {
          await handleEdit();
        }
        if (buttonIndex === 4) {
          await handleDelete();
        }
      }
    );
  } else if (Platform.OS === 'android') {
    return (
      <Picker
        onValueChange={async (itemIndex) => {
          if (itemIndex === 0) {
            return;
          }
          if (itemIndex === 1) {
            await handleShare();
          }
          if (itemIndex === 2) {
            await handleReport();
          }
          if (itemIndex === 3) {
            await handleEdit();
          }
          if (itemIndex === 4) {
            await handleDelete();
          }
        }}
      >
        <Picker.Item label={PostCreationTexts.options.cancel[language]} />
        <Picker.Item label={PostCreationTexts.options.share[language]} />
        <Picker.Item label={PostCreationTexts.options.report[language]} />
        {userId && userId === authorId && (
          <>
            <Picker.Item color={Colors.highlight.main} label={PostCreationTexts.options.edit[language]} />
            <Picker.Item color={Colors.highlight.main} label={PostCreationTexts.deletePost[language]} />
          </>
        )}
      </Picker>
    );
  }
}
