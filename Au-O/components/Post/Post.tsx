/**
 * Poszt kártya komponens
 * @module post/Post
 * @category Component
 */
import { Reactions } from '@/constants/types';
import { PostCardProps } from './props';
import { Pressable, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import ThemedText from '../ui/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { ConfirmDialog, getPostType } from '@/lib/functions';
import PostHeaderElement from './base/PostHeaderElement';
import PostAuthorDisplayElement from './base/PostAuthorDisplayElement';
import { generalTexts, HomeTexts, PostCreationTexts, PostStatusTexts } from '@/constants/texts';
import { router } from 'expo-router';
import TapCountWrapper from '../utility/TapCountWrapper';
import PostImage from './base/PostImage';
import { addReaction } from '@/lib/ApiCalls/ReactionApiCalls';
import PostFooter from './base/PostFooter';
import PostVehicleBanner from './base/PostVehicleBanner';
import PostOptionModal from './base/PostOptionMenu';
/**
 * @param {PostCardProps} props Tulajdonságok
 */
export default function PostCard({
  preview = false,
  authorNickname,
  authorId,
  authorProfileImg,
  isAuthorized,
  event,
  group,
  authorUsername,
  comments,
  date,
  description,
  images,
  location,
  reactions,
  language,
  allowOptions,
  isNew,
  colorScheme,
  favorite,
  postId,
  user,
  reaction,
  vehicle,
}: PostCardProps) {
  const postType = getPostType(authorNickname, authorUsername, group, event);

  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [currentReaction, setCurrentReaction] = useState<null | 'FIRE' | 'HEART' | 'COOL'>(reaction);
  const [reactionState, setReactions] = useState<Reactions>({
    FIRE: reactions.FIRE || 0,
    HEART: reactions.HEART || 0,
    COOL: reactions.COOL || 0,
  });
  async function handlePress(type: null | 'FIRE' | 'HEART' | 'COOL') {
    if (currentReaction === type) {
      await addReaction('post', postId!, type);
      if (type) {
        setReactions({
          ...reactionState,
          [type]: reactionState[type] - 1,
        });
      }
      setCurrentReaction(null);
    } else {
      await addReaction('post', postId!, type);
      setCurrentReaction(type);
      if (type) {
        setReactions({
          ...reactionState,
          [type]: reactionState[type] + 1,
        });
      }
    }
  }

  function showShareModal() {
    ConfirmDialog(
      () => {
        setMenuVisible(true);
      },
      PostStatusTexts.newShare.title[language],
      PostStatusTexts.newShare.message[language],
      language
    );
  }

  if (isNew) {
    showShareModal();
  }
  return (
    <>
      <View
        className={
          isDeleted
            ? 'hidden'
            : 'post-container my-3 flex flex-col justify-items-center align-middle items-center primary rounded-lg overflow-hidden'
        }
      >
        <View className="flex flex-row py-2 px-2 secondary">
          <View className="post-header">
            <PostHeaderElement
              authorProfileImg={authorProfileImg}
              authorUsername={authorUsername}
              authorNickname={authorNickname}
              colorScheme={colorScheme}
              onPress={() => {
                router.push({
                  pathname: '/(profile)/[id]',
                  params: { id: authorId! },
                });
              }}
              postType={postType}
              event={event}
              group={group}
            />
            <PostAuthorDisplayElement
              authorProfileImg={authorProfileImg}
              authorUsername={authorUsername}
              authorNickname={authorNickname}
              colorScheme={colorScheme}
              onPress={() => {
                router.push({
                  pathname: '/(profile)/[id]',
                  params: { id: authorId!.toString() },
                });
              }}
              postType={postType}
              event={event}
              group={group}
            />
          </View>
          <View className="post-options self-center">
            <PostOptionModal
              colorScheme={colorScheme}
              setVisible={setMenuVisible}
              language={language}
              menuVisible={menuVisible}
              authorId={authorId}
              isAuthorized={isAuthorized}
              postId={postId}
              userId={user.id}
              favorite={favorite}
            />
            <MaterialCommunityIcons
              name="dots-horizontal"
              className="pr-6"
              size={24}
              color={colorScheme === 'dark' ? 'white' : 'black'}
              onPress={() => {
                setMenuVisible(true);
              }}
            />
          </View>
        </View>
        <Pressable
          onLongPress={allowOptions === true || allowOptions === undefined ? () => setMenuVisible(true) : () => {}}
        >
          <TapCountWrapper
            onDoubleTap={async () => {
              await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              handlePress('FIRE');
            }}
            onSingleTap={
              postId
                ? () => {
                    router.push({
                      pathname: '/(post)/page/[id]',
                      params: { id: postId },
                    });
                  }
                : () => {}
            }
          >
            <View className="w-screen h-[100vw] overflow-hidden flex flex-row justify-items-center align-middle items-center">
              {event && (
                <View className="post-event-data">
                  <ThemedText className=" font-semibold text-lg">
                    {event.attendees} {HomeTexts.post.attendees[language]}
                  </ThemedText>
                </View>
              )}
              <PostImage images={images.map((img) => img.url)} />
            </View>
          </TapCountWrapper>
          {vehicle && (
            <PostVehicleBanner vehicle={vehicle} colorScheme={colorScheme} language={language} preview={preview} />
          )}
        </Pressable>

        <PostFooter
          authorProfileImg={authorProfileImg}
          authorId={authorId!}
          authorNickname={authorNickname!}
          authorUsername={authorUsername}
          colorScheme={colorScheme}
          comments={comments}
          currentReaction={currentReaction}
          date={date}
          description={description}
          language={language}
          postId={postId!}
          reactionState={reactionState}
          user={user}
          location={location}
          preview={preview}
          handlePress={(reaction) => handlePress(reaction)}
        />
      </View>
    </>
  );
}
