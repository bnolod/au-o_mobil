import { CommentTexts, HomeTexts } from '@/constants/texts';
import { Keyboard, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { CommonStaticElementProps } from '@/constants/types';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { AddCommentToPost } from '@/lib/ApiCalls/CommentApiCalls';
import ApiCallButton from '@/components/ui/ApiCallButton';
import { AddCommentRowProps } from './props';
import { validateComment } from '@/lib/Validation/Validation';

export default function AddCommentRow({
  authorNickname,
  language,
  colorScheme,
  focus,
  postId,
  onPostComment,
}: AddCommentRowProps & CommonStaticElementProps) {
  const [commentText, setCommentText] = useState<string>('');
  async function handleSubmitComment() {
    if (!validateComment(commentText, language).valid) {
      return
    }
    const res = await AddCommentToPost(postId.toString(), commentText);
    if (res) {
      setCommentText('');
      onPostComment(res);
      Keyboard.dismiss();
      Toast.show({
        text1: CommentTexts.commentCreated.success[language],
        type: 'success',
      });
    } else {
      Toast.show({
        text1: CommentTexts.commentCreated.error[language],
        type: 'error',
      });
    }
  }
  return (
    <View className="flex flex-row justify-between px-2 w-full bg-backdrop-secondary dark:bg-backdrop-primary-dark gap-4">
      <View className="flex-1 rounded-xl">
        <BottomSheetTextInput
          value={commentText}
          autoFocus={focus}
          className=" h-12 rounded-xl px-2"
          placeholderClassName="text-gray-500"
          placeholderTextColor={'#767676'}
          onChangeText={(text) => setCommentText(text)}
          style={{
            backgroundColor: Colors[colorScheme].secondary,
            color: Colors[colorScheme].text,
          }}
          placeholder={
            HomeTexts.post.comment_1[language] + ' ' + authorNickname + ' ' + HomeTexts.post.comment_2[language]
          }
        />
      </View>
      <View className="">
        <ApiCallButton className="post-comment-send-reply-button" apiCall={handleSubmitComment} delay={1000}>
          <MaterialCommunityIcons name="send" size={24} color={Colors[colorScheme].text} />
        </ApiCallButton>
      </View>
    </View>
  );
}
