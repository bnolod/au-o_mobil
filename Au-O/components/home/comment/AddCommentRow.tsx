import { CommentTexts, HomeTexts } from '@/constants/texts';
import { Keyboard, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { AddCommentRowProps, CommonStaticElementProps } from '@/constants/types';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { AddCommentToPost } from '@/lib/ApiCalls/CommentApiCalls';
import ApiCallButton from '@/components/ui/ApiCallButton';

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
    <View className="post-comment-add">
      <View className="basis-10/12 rounded-xl">
        <BottomSheetTextInput
          value={commentText}
          autoFocus={focus}
          className="primary h-12 rounded-xl px-2"
          placeholderClassName="text-gray-500"
          placeholderTextColor={'#767676'}
          onChangeText={(text) => setCommentText(text)}
          style={{
            backgroundColor: Colors[colorScheme].primary,
            color: Colors[colorScheme].text,
          }}
          placeholder={
            HomeTexts.post.comment_1[language] + ' ' + authorNickname + ' ' + HomeTexts.post.comment_2[language]
          }
        />
      </View>
      <View className="basis-1/12">
        <ApiCallButton className="post-comment-send-reply-button" apiCall={handleSubmitComment} delay={1000}>
          <MaterialCommunityIcons name="send" size={24} color={Colors[colorScheme].text} />
        </ApiCallButton>
      </View>
    </View>
  );
}
