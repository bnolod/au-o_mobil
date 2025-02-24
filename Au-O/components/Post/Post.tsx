import { Reactions } from '@/constants/types';
import { PostCardProps } from './props';
import { Pressable, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import ThemedText from '../ui/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { getPostType } from '@/lib/functions';
import PostHeaderElement from './base/PostHeaderElement';
import PostAuthorDisplayElement from './base/PostAuthorDisplayElement';
import { HomeTexts } from '@/constants/texts';
import { router } from 'expo-router';
import TapCountWrapper from '../utility/TapCountWrapper';
import PostOptionMenu from './base/PostOptionMenu';
import PostImage from './base/PostImage';
import { addReaction } from '@/lib/ApiCalls/ReactionApiCalls';
import PostFooter from './base/PostFooter';
import PostVehicleBanner from './base/PostVehicleBanner';
import { deleteImgurImage } from '@/lib/ApiCalls/ImageApiCalls';
export default function PostCard({
  preview = false,
  authorNickname,
  authorId,
  authorProfileImg,
  eventData,
  groupData,
  authorUsername,
  comments,
  date,
  description,
  images,
  location,
  reactions,
  language,
  colorScheme,
  postId,
  user,
  reaction,
  vehicle,
}: PostCardProps) {
  const postType = getPostType(authorNickname, authorUsername, groupData, eventData);
  async function showOptions() {
    if (!preview) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      PostOptionMenu(preview, language, postId!, user!.id, authorId, () => {
        setIsDeleted(true);
        for (const img of images) {
          async function handleImageDelete() {
            const res = await deleteImgurImage(img.deleteHash);
            if (res === true) {
              console.log('Image deleted.');
            }
          }
        }
      });
    }
  }

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
  return (
    <>
      <View className={isDeleted ? 'hidden' : 'post-container'}>
        <View className="post-header-container">
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
              eventData={eventData || null}
              groupData={groupData || null}
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
              eventData={eventData || null}
              groupData={groupData || null}
            />
          </View>
          <View className="post-options">
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={36}
              color={colorScheme === 'dark' ? 'white' : 'black'}
              onPress={() => showOptions()}
            />
          </View>
        </View>
        <Pressable onLongPress={() => showOptions()}>
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
            <View className="post-image">
              {eventData && (
                <View className="post-event-data">
                  <ThemedText className=" font-semibold text-lg">
                    {eventData.attendees} {HomeTexts.post.attendees[language]}
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
