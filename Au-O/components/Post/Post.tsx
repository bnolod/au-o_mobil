import { Reactions } from "@/constants/types";
import { PostCardProps } from "./props";
import { Pressable, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import React from "react";
import ThemedText from "../ui/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReactionButton from "../ui/ReactionButton";
import { useState } from "react";
import { formatDate, getPostType } from "@/lib/functions";
import CommentSheet from "../home/CommentSheet";
import PostHeaderElement from "./base/PostHeaderElement";
import PostAuthorDisplayElement from "./base/PostAuthorDisplayElement";
import { generalTexts, HomeTexts } from "@/constants/texts";
import { router } from "expo-router";
import TapCountWrapper from "../utility/TapCountWrapper";
import PostOptionMenu from "./base/PostOptionMenu";
import PostImage from "./base/PostImage";
import {deleteImgurImage } from "@/lib/apiClient";

import CollapsibleText from "../ui/CollapsibleText";
import { getCarImage } from "../graphics/cars";
import { addReaction } from "@/lib/ApiCalls/ReactionApiCalls";
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
  const postType = getPostType(
    authorNickname,
    authorUsername,
    groupData,
    eventData
  );
  async function showOptions() {
    if (!preview) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      PostOptionMenu(preview, language, postId!, user!.id, authorId, () => {
        setIsDeleted(true);
        for (const img of images) {
          async function handleImageDelete() {
            const res = await deleteImgurImage(img.deleteHash);
            if (res === true) {
              console.log("Image deleted.");
            }
          }
        }
      });
    }
  }

  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [currentReaction, setCurrentReaction] = useState<
  null | "FIRE" | "HEART" | "COOL"
  >(reaction);
  const [reactionState, setReactions] = useState<Reactions>({
    FIRE: reactions.FIRE || 0,
    HEART: reactions.HEART || 0,
    COOL: reactions.COOL || 0,
  });
  async function handlePress(type: null | "FIRE" | "HEART" | "COOL") {
    if (currentReaction === type) {
      await addReaction("post", postId!, type);
      if (type) {
        setReactions({
          ...reactionState,
          [type]: reactionState[type] - 1,
        });
      }
      setCurrentReaction(null);
    } else {
      await addReaction("post", postId!, type);
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
      <View className={isDeleted ? "hidden" : "post-container"}>
        <View className="post-header-container">
          <View className="post-header">
            <PostHeaderElement
              authorProfileImg={authorProfileImg}
              authorUsername={authorUsername}
              authorNickname={authorNickname}
              colorScheme={colorScheme}
              onPress={() => {
                router.push({
                  pathname: "/(profile)/[id]",
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
                  pathname: "/(profile)/[id]",
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
              color={colorScheme === "dark" ? "white" : "black"}
              onPress={() => showOptions()}
            />
          </View>
        </View>
        <Pressable onLongPress={() => showOptions()}>
          <TapCountWrapper
            onDoubleTap={async () => {
              await Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
              handlePress("FIRE");
            }}
            onSingleTap={
              postId
                ? () => {
                    router.push({
                      pathname: "/(post)/page/[id]",
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
            <Pressable onPress={preview ? () => {} : () => router.push({pathname: "/(garage)/[id]", params: {id: vehicle.id}})} className="w-full h-12 primary rounded-t-xl " >

            <View className="post-vehicle-container">
              <View className="scale-125">
                {getCarImage(vehicle.type, colorScheme, 52, 36, 3)}
              </View>
              <View className="post-vehicle-data">

              <ThemedText className="tlg text-highlight-light">
                {vehicle.manufacturer}
              </ThemedText>
              <ThemedText className="text-lg text-highlight-light">
                {vehicle.model}
              </ThemedText>
              </View>
              <View className="post-vehicle-misc-data">
                <ThemedText>{vehicle.productionYear}</ThemedText>
                <ThemedText>{vehicle.horsepower} {generalTexts.profileAttributes.cars.horsepower[language]}</ThemedText>
                <ThemedText>{vehicle.displacement/10} l</ThemedText>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={32} color={colorScheme === "dark" ? "white" : "black"} />
            </View>
            </Pressable>
          )}
        </Pressable>

        <View className="post-footer">
          <View className="post-reaction-container">
            <View className=" gap-2 flex flex-row basis-7/12">
              <ReactionButton
                initialReactionState={currentReaction}
                type="FIRE"
                state={currentReaction !== "FIRE" ? "inactive" : "active"}
                count={reactionState.FIRE}
                onPress={
                  !preview
                    ? async () => {
                        await Haptics.impactAsync(
                          Haptics.ImpactFeedbackStyle.Heavy
                        );
                        handlePress("FIRE");
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
                        await Haptics.impactAsync(
                          Haptics.ImpactFeedbackStyle.Heavy
                        );
                        handlePress("HEART");
                      }
                    : () => {}
                }
                state={currentReaction !== "HEART" ? "inactive" : "active"}
              />
              <ReactionButton
                initialReactionState={currentReaction}
                type="COOL"
                count={reactionState.COOL}
                onPress={
                  !preview
                    ? async () => {
                        await Haptics.impactAsync(
                          Haptics.ImpactFeedbackStyle.Heavy
                        );
                        handlePress("COOL");
                      }
                    : () => {}
                }
                state={currentReaction !== "COOL" ? "inactive" : "active"}
              />
            </View>
            <View className="post-data-container">
              <Text className="post-location-text">
                {location}
              </Text>
              <ThemedText>{formatDate(date)}</ThemedText>
            </View>
          </View>
          <View
            className="post-description-container"
          >
            <CollapsibleText
              className="post-description"
              restrictedLineCount={3}
            >
              <Text className="post-author-text">
                {authorUsername + "  "}
              </Text>
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
      </View>
    </>
  );
}
