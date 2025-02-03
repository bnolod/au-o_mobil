import { PostCardProps, Reactions, ReactionState } from "@/constants/types";
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
import { handleReaction, handleShowMore } from "@/lib/events";
import { addReaction } from "@/lib/apiClient";
import Toast from "react-native-toast-message";

export default function PostCard({
  preview = false,
  author_nickname,
  author_id,
  eventData,
  groupData,
  author_username,
  user_nickname,
  comments,
  user_profile_img,
  date,
  description,
  images,
  location,
  reactions,
  language,
  colorScheme,
  post_id,
  user_id,
}: PostCardProps & {
  user_id: number | null;
  author_id: number | null;
  user_nickname: string;
  user_profile_img: string;
}) {
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
      });
    }
  }
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [reactionState, setReactions] = useState<ReactionState>({
    fire: reactions.fire,
    heart: reactions.heart,
    sunglasses: reactions.sunglasses,
  });
  const [lines, setLines] = useState<number | undefined>(3);

  return (
    <View className={isDeleted ? "hidden" : "post-container"}>
      <View className="post-header justify-between">
        <View className="flex-row flex items-center basis-11/12">
          <PostHeaderElement
            author_nickname={author_nickname}
            author_username={author_username}
            colorScheme={colorScheme}
            onPress={() => {
              router.push({
                pathname: "/(root)/profile/[id]",
                params: { id: author_id!.toString() },
              });
            }}
            postType={postType}
            eventData={eventData || null}
            groupData={groupData || null}
          />

          <PostAuthorDisplayElement
            author_nickname={author_nickname}
            author_username={author_username}
            colorScheme={colorScheme}
            onPress={() => {
              router.push({
                pathname: "/(root)/profile/[id]",
                params: { id: author_id!.toString() },
              });
            }}
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
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            const reactionResponse = await addReaction(post_id!, "FIRE");
            if (reactionResponse === true) {
              setReactions(handleReaction(reactions, reactionState, "fire"));
            } else
              Toast.show({ text1: "Something went wrong.", type: "error" });
          }}
          onSingleTap={
            post_id
              ? () => {
                  router.push({
                    pathname: "/(post)/page/[id]",
                    params: { id: post_id },
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
            <PostImage images={images} />
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
              onPress={
                !preview
                  ? async () =>
                      {
                        
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          const reactionResponse = await addReaction(post_id!, "FIRE")
          if (reactionResponse === true) {
            setReactions(handleReaction(reactions, reactionState, "fire"))
          }
          else Toast.show({text1: "Something went wrong.", type: "error"})
                      }
                  : () => {}
              }
            />
            <ReactionButton
              type="heart"
              count={reactionState.heart}
              onPress={
                !preview
                  ? async () =>{
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    const reactionResponse = await addReaction(post_id!, "HEART")
                    if (reactionResponse === true) {
                      setReactions(handleReaction(reactions, reactionState, "heart"))
                    }
                    else Toast.show({text1: "Something went wrong.", type: "error"})}
                      
                  : () => {}
              }
              state={
                reactionState.heart === reactions.heart ? "inactive" : "active"
              }
            />
            <ReactionButton
              type="sunglasses"
              count={reactionState.sunglasses}
              onPress={
                !preview
                  ? async () =>{
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    const reactionResponse = await addReaction(post_id!, "COOL")
                    if (reactionResponse === true) {
                      setReactions(handleReaction(reactions, reactionState, "sunglasses"))
                    }
                    else Toast.show({text1: "Something went wrong.", type: "error"})}
                  : () => {}
              }
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
            onPress={() => setLines(handleShowMore(lines))}
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
          postId={post_id!}
          user_nickname={user_nickname}
          user_profile_img={user_profile_img}
          authorId={author_id!}
          userId={user_id!}
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
