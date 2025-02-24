import { Alert, Pressable, View } from 'react-native';
import Avatar from './Avatar';
import ThemedText from './ThemedText';
import * as Haptics from 'expo-haptics';
import { Reactions } from '@/constants/types';
import { Text } from 'react-native';
import { CommentTexts } from '@/constants/texts';
import Toast from 'react-native-toast-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CollapsibleText from './CollapsibleText';
import { useState } from 'react';
import ReactionButton from './ReactionButton';
import { deleteReply } from '@/lib/ApiCalls/ReplyApiCalls';
import { addReaction } from '@/lib/ApiCalls/ReactionApiCalls';
import { ReplyProps } from './props';
export default function ReplyItem({ item, language, preview, userId, authorId, onDelete }: ReplyProps) {
  const [currentReaction, setCurrentReaction] = useState<null | 'FIRE' | 'HEART' | 'COOL'>(item.reactedWith);

  const [reactionState, setReactions] = useState<Reactions>({
    FIRE: item.reactionTypeMap && item.reactionTypeMap.FIRE ? item.reactionTypeMap.FIRE : 0,
    HEART: item.reactionTypeMap && item.reactionTypeMap.HEART ? item.reactionTypeMap.HEART : 0,
    COOL: item.reactionTypeMap && item.reactionTypeMap.COOL ? item.reactionTypeMap.COOL : 0,
  });

  async function handlePress(type: null | 'FIRE' | 'HEART' | 'COOL') {
    if (currentReaction === type) {
      await addReaction('reply', item.id, type);
      if (type) {
        setReactions({
          ...reactionState,
          [type]: reactionState[type] - 1,
        });
      }
      setCurrentReaction(null);
    } else {
      await addReaction('reply', item.id!, type);
      setCurrentReaction(type);
      if (type) {
        setReactions({
          ...reactionState,
          [type]: reactionState[type] + 1,
        });
      }
    }
  }

  async function handleReplyDelete() {
    const res = await deleteReply(item.id);
    if (res === true) {
      onDelete(item.id);
      Toast.show({
        text1: CommentTexts.deletePrompt.success[language],
      });
    } else {
      Toast.show({
        text1: CommentTexts.deletePrompt.error[language],
      });
    }
  }
  return (
    <Pressable
      className="reply"
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
                onPress: () => handleReplyDelete(),
              }
            : {},
        ]);
      }}
    >
      <View className="comment-header">
        <View className="reply-avatar">
          <Avatar image={item.user.profileImg} nickname={item.user.nickname} />
        </View>
        <View className="comment-user">
          <ThemedText className="tlg">
            {item.user.nickname}{' '}
            {item.user.id === authorId && <MaterialCommunityIcons name="star" size={16} color="#FFD700" />}
          </ThemedText>
          <Text
            style={{
              color: '#767676',
              fontSize: 12,
            }}
          >
            @{item.user.username}
          </Text>
        </View>
      </View>
      <CollapsibleText>{item.text}</CollapsibleText>
      <View className="comment-reactions">
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
    </Pressable>
  );
}
