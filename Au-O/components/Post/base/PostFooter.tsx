import ReactionButton from '@/components/ui/ReactionButton';
import { View } from 'react-native';
import { Text } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import CollapsibleText from '@/components/ui/CollapsibleText';
import CommentSheet from '@/components/home/comment/CommentSheet';
import * as Haptics from 'expo-haptics';
import { formatDate } from '@/lib/functions';
import { CommonStaticElementProps } from '@/constants/types';
import { PostFooterProps } from './props';
export default function PostFooter({
  currentReaction,
  reactionState,
  preview,
  handlePress,
  location,
  date,
  authorUsername,
  description,
  postId,
  user,
  authorId,
  authorNickname,
  comments,
  language,
  colorScheme,
}: PostFooterProps & CommonStaticElementProps) {
  return (
    <View className="post-footer">
      <View className="post-reaction-container">
        <View className=" gap-2 flex flex-row basis-7/12">
          <ReactionButton
            initialReactionState={currentReaction}
            type="FIRE"
            state={currentReaction !== 'FIRE' ? 'inactive' : 'active'}
            count={reactionState.FIRE}
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
            count={reactionState.HEART}
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
            count={reactionState.COOL}
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
        <View className="post-data-container">
          <Text className="post-location-text">{location}</Text>
          <ThemedText>{formatDate(date)}</ThemedText>
        </View>
      </View>
      <View className="post-description-container">
        <CollapsibleText className="post-description" restrictedLineCount={3}>
          <Text className="post-author-text">{authorUsername + '  '}</Text>
          {description}
        </CollapsibleText>
      </View>

      <CommentSheet
        postId={postId!}
        userProfileImg={user!.profileImg}
        userNickname={user!.nickname}
        authorId={authorId!}
        userId={user!.id}
        authorNickname={authorNickname}
        preview={preview}
        language={language}
        colorScheme={colorScheme}
        comments={comments}
      />
    </View>
  );
}
