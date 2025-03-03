import { Alert, Dimensions, Keyboard, Pressable, Text, TouchableOpacity, View } from 'react-native';
import ThemedText from './ThemedText';
import { CommonStaticElementProps, Reactions } from '@/constants/types';
import Avatar from './Avatar';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { DeleteComment } from '@/lib/ApiCalls/CommentApiCalls';
import { sendReply } from '@/lib/ApiCalls/ReplyApiCalls';
import ReplyItem from './Reply';
import Toast from 'react-native-toast-message';
import { FlashList } from '@shopify/flash-list';
import { CommentTexts } from '@/constants/texts';
import CollapsibleText from './CollapsibleText';
import ReactionButton from './ReactionButton';
import ApiCallButton from './ApiCallButton';
import { Reply } from '@/lib/entity/Reply';
import { addReaction } from '@/lib/ApiCalls/ReactionApiCalls';
import { CommentElementProps } from './props';
import { validateReply } from '@/lib/Validation/Validation';
export default function CommentElement({
  item,
  language,
  userId,
  authorId,
  preview,
  colorScheme,
  onDelete,
}: CommentElementProps & CommonStaticElementProps) {
  const [replying, setReplying] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>('');
  const [currentReaction, setCurrentReaction] = useState<null | 'FIRE' | 'HEART' | 'COOL'>(item.reactedWith);
  const [reactionState, setReactions] = useState<Reactions>({
    FIRE: item.reactionTypeMap && item.reactionTypeMap.FIRE ? item.reactionTypeMap.FIRE : 0,
    HEART: item.reactionTypeMap && item.reactionTypeMap.HEART ? item.reactionTypeMap.HEART : 0,
    COOL: item.reactionTypeMap && item.reactionTypeMap.COOL ? item.reactionTypeMap.COOL : 0,
  });
  const [renderedReplies, setRenderedReplies] = useState<Reply[]>(item.replies ? item.replies : []);
  async function handleCommentDelete() {
    Alert.alert(CommentTexts.deletePrompt.message[language], '', [
      {
        text: CommentTexts.deletePrompt.buttons.cancel[language],
        style: 'cancel',
      },
      {
        text: CommentTexts.deletePrompt.buttons.delete[language],
        style: 'destructive',
        onPress: async () => {
          const res = await DeleteComment(item.id.toString());
          if (res === true) {
            onDelete(item.id);
            Toast.show({ text1: CommentTexts.deletePrompt.success[language] });
          } else Toast.show({ text1: CommentTexts.deletePrompt.error[language] });
        },
      },
    ]);
  }
  async function handleReplySend() {
    if (!validateReply(replyText, language).valid) {
      return;
    }
    const res = await sendReply(item.id.toString(), replyText);
    if (res) {
      setReplyText('');
      setReplying(false);
      setRenderedReplies([res, ...renderedReplies]);
      Keyboard.dismiss();
      Toast.show({
        text1: CommentTexts.replyCreated.success[language],
        type: 'success',
      });
    } else
      Toast.show({
        text1: CommentTexts.replyCreated.error[language],
        type: 'error',
      });
  }
  async function handlePress(type: null | 'FIRE' | 'HEART' | 'COOL') {
    if (currentReaction === type) {
      await addReaction('comment', item.id, type);
      if (type) {
        setReactions({
          ...reactionState,
          [type]: reactionState[type] - 1,
        });
      }
      setCurrentReaction(null);
    } else {
      await addReaction('comment', item.id!, type);
      setCurrentReaction(type);
      if (type) {
        setReactions({
          ...reactionState,
          [type]: reactionState[type] + 1,
        });
      }
    }
  }

  return (
    <Pressable
      onLongPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        Alert.alert(`${item.user.nickname}${CommentTexts.commentAuthor[language]}`, '', [
          {
            text: CommentTexts.commentButtons.cancel[language],
            style: 'cancel',
          },
          item.user.id === userId || authorId === userId
            ? {
                text: CommentTexts.commentButtons.delete[language],
                style: 'destructive',
                onPress: () => handleCommentDelete(),
              }
            : {},
        ]);
      }}
      className="comment"
    >
      <View className="comment-header">
        <View className="comment-avatar">
          <Avatar image={item.user.profileImg} nickname={item.user.nickname} />
        </View>
        <View className="comment-user">
          <ThemedText className="tlg">
            {item.user.nickname}{' '}
            {item.user.id === authorId && <MaterialCommunityIcons name="star" size={16} color="#FFD700" />}
          </ThemedText>
          <Text style={{ color: '#767676', fontSize: 12 }}>@{item.user.username}</Text>
        </View>
      </View>
      <View className="comment-body">
        <View className="flex flex-row">
          <View className="comment-reply-line-container">
            <View className="comment-reply-line" />
          </View>
          <View className="comment-text-body">
            <CollapsibleText className=" basis-8/12 " restrictedLineCount={3}>
              {item.text}
            </CollapsibleText>
            <View className="comment-reactions">
              <TouchableOpacity
                className="w-12 h-12 flex rounded-xl items-center justify-center secondary"
                onPress={() => setReplying(!replying)}
              >
                <MaterialCommunityIcons
                  name={replying ? 'reply' : 'reply-outline'}
                  size={32}
                  color={Colors[colorScheme!].text}
                />
              </TouchableOpacity>
              <ReactionButton
                initialReactionState={currentReaction}
                type="FIRE"
                state={currentReaction !== 'FIRE' ? 'inactive' : 'active'}
                count={reactionState.FIRE || 0}
                onPress={
                  !preview
                    ? async () => {
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                        handlePress('FIRE');
                      }
                    : () => {}
                }
              />
              <ReactionButton
                initialReactionState={currentReaction}
                type="HEART"
                count={reactionState.HEART || 0}
                onPress={
                  !preview
                    ? async () => {
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                        handlePress('HEART');
                      }
                    : () => {}
                }
                state={currentReaction !== 'HEART' ? 'inactive' : 'active'}
              />
              <ReactionButton
                initialReactionState={currentReaction}
                type="COOL"
                count={reactionState.COOL || 0}
                onPress={
                  !preview
                    ? async () => {
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                        handlePress('COOL');
                      }
                    : () => {}
                }
                state={currentReaction !== 'COOL' ? 'inactive' : 'active'}
              />
            </View>
            {replying && (
              <View className="flex flex-row gap-2 items-center justify-center">
                <BottomSheetTextInput
                  value={replyText}
                  autoFocus
                  onChangeText={(text) => setReplyText(text)}
                  multiline
                  style={{
                    width: 'auto',
                    height: 44,
                    backgroundColor: Colors[colorScheme!].secondary,
                    marginTop: 4,
                    borderRadius: 8,
                    paddingHorizontal: 4,
                    color: Colors[colorScheme!].text,
                    flexBasis: Dimensions.get('window').width * 0.7,
                  }}
                  placeholderTextColor={'#767676'}
                />
                <ApiCallButton
                  className="w-12 h-12 flex rounded-xl items-center justify-center secondary"
                  apiCall={handleReplySend}
                  delay={1000}
                >
                  <MaterialCommunityIcons name="send" size={32} color={Colors[colorScheme!].text} />
                </ApiCallButton>
              </View>
            )}
            <View></View>
            {renderedReplies.length > 0 && (
              <FlashList
                estimatedItemSize={100}
                data={renderedReplies}
                renderItem={({ item }) => (
                  <ReplyItem
                    preview={preview}
                    userId={userId}
                    authorId={authorId}
                    language={language}
                    onDelete={(id) => setRenderedReplies(renderedReplies.filter((item) => item.id !== id))}
                    key={item.id}
                    item={item}
                  />
                )}
              />
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}
