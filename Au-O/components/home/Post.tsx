import { PostCardProps } from "@/constants/types";
import { Pressable, View } from "react-native";
import * as Haptics from "expo-haptics";
import React from "react";
import ThemedText from "../ui/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReactionButton from "../ui/ReactionButton";
import { useState } from "react";
import { formatDate, getPostType } from "@/lib/functions";
import CommentSheet from "./CommentSheet";
import PostHeaderElement from "./PostHeaderElement";
import PostAuthorDisplayElement from "./PostAuthorDisplayElement";
import { HomeTexts } from "@/constants/texts";
import { router } from "expo-router";
import TapCountWrapper from "../utility/TapCountWrapper";
import PostOptionMenu from "./PostOptionMenu";
import PostImage from "./PostImage";

export default function PostCard({
  preview = false,
  author_nickname,
  author_id,
  eventData,
  groupData,
  author_username,
  comments,
  date,
  description,
  images,
  location,
  reactions,
  language,
  colorScheme,
  post_id,
  user_id
}: PostCardProps & { user_id: number | null, author_id: number | null }) {
  const postType = getPostType(
    author_nickname,
    author_username,
    groupData,
    eventData
  );
  function showOptions() {
    if (!preview) {

      PostOptionMenu(preview, language, post_id!, user_id, author_id, () => {
        setIsDeleted(true);
      })
    }
  }
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [reactionState, setReactions] = useState<{
    fire: number;
    heart: number;
    sunglasses: number;
  }>({
    fire: reactions.fire,
    heart: reactions.heart,
    sunglasses: reactions.sunglasses,
  });
  const [lines, setLines] = useState<number | undefined>(3);

  function handleShowMore() {
    setLines(lines === 3 ? undefined : 3);
  }
  const handleReaction = (type: "fire" | "heart" | "sunglasses") => {
    const newReactions = { ...reactionState };
    newReactions[type] =
      newReactions[type] === reactions[type]
        ? reactions[type] + 1
        : reactions[type];
    setReactions(newReactions);
  };
  return (
    <View className={isDeleted ? "hidden" : "post-container"}>
      <View className="post-header justify-between">
        <View className="flex-row flex items-center basis-11/12">
          <PostHeaderElement
            author_nickname={author_nickname}
            author_username={author_username}
            colorScheme={colorScheme}
            onPress={() => {}}
            postType={postType}
            eventData={eventData || null}
            groupData={groupData || null}
          />

          <PostAuthorDisplayElement
            author_nickname={author_nickname}
            author_username={author_username}
            colorScheme={colorScheme}
            onPress={() => {}}
            postType={postType}
            eventData={eventData || null}
            groupData={groupData || null}
          />
        </View>
        <View className="flex flex-row basis-1/12 justify-end text-right">
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
          handleReaction("fire");
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }}
        onSingleTap={
          post_id
          ? () => {
            router.push({
                  pathname: "/(post)/page/[id]",
                  params: { id: post_id},
                });
              }
            : () => {}
        }
      >
        <View className="post-image">
          {eventData && (
            <View className="w-1/2 h-8 secondary absolute z-50 top-6 left-6 flex justify-center items-center rounded-xl">
              <ThemedText className=" font-semibold text-lg">
                {eventData.attendees} {HomeTexts.post.attendees[language]}
              </ThemedText>
            </View>
          )}
          <PostImage images={images}/>
        </View>
      </TapCountWrapper>
          </Pressable>
      <View className="post-footer">
        <View className="post-reaction-container">
          <View className=" gap-2 flex flex-row basis-7/12">
            <ReactionButton
              type="fire"
              state={
                reactionState.fire === reactions.fire ? "inactive" : "active"
              }
              count={reactionState.fire}
              onPress={!preview ? () => handleReaction("fire") : () => {}}
              />
            <ReactionButton
              type="heart"
              count={reactionState.heart}
              onPress={!preview ? () => handleReaction("heart") : () => {}}
              state={
                reactionState.heart === reactions.heart ? "inactive" : "active"
              }
            />
            <ReactionButton
              type="sunglasses"
              count={reactionState.sunglasses}
              onPress={!preview ? () => handleReaction("sunglasses") : () => {}}
              state={
                reactionState.sunglasses === reactions.sunglasses
                  ? "inactive"
                  : "active"
              }
            />
          </View>
          <View className="post-data-container">
            <ThemedText className=" text-highlight-light dark:text-highlight">
              {location}
            </ThemedText>
            <ThemedText>{formatDate(date)}</ThemedText>
          </View>
        </View>
        <View
          className={`px-4 pt-2 pb-5 flex flex-row  dark:bg-backdrop-primary-dark bg-backdrop-secondary`}
        >
          <ThemedText
            onPress={handleShowMore}
            ellipsizeMode="tail"
            className="text-lg leading-tight flex gap-2"
            numberOfLines={lines}
          >
            <ThemedText className="text-highlight-light pr-4 dark:text-highlight font-semibold">
              {author_username + "  "}
            </ThemedText>
            {description}
          </ThemedText>
        </View>

        <CommentSheet
          author_nickname={author_nickname}
          preview={preview}
          language={language}
          colorScheme={colorScheme}
          comments={comments}
        />
      </View>
    </View>
  );
}
