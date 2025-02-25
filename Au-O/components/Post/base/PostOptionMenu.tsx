import React from 'react';
import { PostCreationTexts, PostStatusTexts } from '@/constants/texts';
import { ActionSheetIOS, Alert, Platform } from 'react-native';
import { handleDelete, handleEdit, handleReport, handleShare } from '@/lib/events/PostOptionEvents';
export default function PostOptionMenu(
  preview: boolean,
  language: 'EN' | 'HU',
  postId: number,
  userId: number | null,
  authorId: number | null,
  onDelete?: () => void,
  onShow?: () => void
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
          await handleShare(postId, language);
        }
        if (buttonIndex === 2) {
          await handleReport();
        }
        if (buttonIndex === 3) {
          await handleEdit(authorId, userId, postId);
        }
        if (buttonIndex === 4) {
          await handleDelete(authorId, userId, language, postId, onDelete);
        }
      }
    );
  } else if (Platform.OS === 'android') {
    onShow && onShow();
    
  }
}
