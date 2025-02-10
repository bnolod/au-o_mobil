import { PostCardProps, Reactions, ReactionState, UserResponse } from "@/constants/types";
import { Modal, Pressable, View } from "react-native";
import * as Haptics from "expo-haptics";
import React, { useEffect } from "react";
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
import { addReaction, deleteImgurImage } from "@/lib/apiClient";
import Toast from "react-native-toast-message";
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
  reaction
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
            const res = await deleteImgurImage(img.deleteHash)
            if (res === true) {
              console.log("Image deleted.")
            }
          }
        }
      })
    }
  }

  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [currentReaction, setCurrentReaction] = useState<null | "FIRE" | "HEART" | "COOL">(reaction)
  const [reactionState, setReactions] = useState<Reactions>({
    FIRE: reactions.FIRE || 0,
    HEART: reactions.HEART || 0,
    COOL: reactions.COOL ||  0,
  });
  const [lines, setLines] = useState<number | undefined>(3);
  useEffect(() => {
    console.log(currentReaction)
  }, [currentReaction])
  return (
    <>

    
    <View className={isDeleted ? "hidden" : "post-container"}>
      <View className="post-header justify-between">
        <View className="flex-row flex items-center basis-11/12">
          <PostHeaderElement
            authorProfileImg={authorProfileImg}
            authorUsername={authorUsername}
            authorNickname={authorNickname}
            colorScheme={colorScheme}
            onPress={() => {
              router.push({
                pathname: "/(profile)/[id]",
                params: { id: authorId!},
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
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            const reactionResponse = await addReaction(postId!, "FIRE");
            if (reactionResponse === true) {
              setReactions(handleReaction("FIRE", reactionState, () => setCurrentReaction(null), currentReaction));
            } else
              Toast.show({ text1: "Something went wrong.", type: "error" });
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
              <View className="w-1/2 h-8 secondary absolute z-50 top-6 left-6 flex justify-center items-center rounded-xl">
                <ThemedText className=" font-semibold text-lg">
                  {eventData.attendees} {HomeTexts.post.attendees[language]}
                </ThemedText>
              </View>
            )}
            <PostImage images={images.map((img) => img.url)} />
          </View>
        </TapCountWrapper>
      </Pressable>
      <View className="post-footer">
        <View className="post-reaction-container">
          <View className=" gap-2 flex flex-row basis-7/12">
            <ReactionButton
            initialReactionState={currentReaction}
              type="FIRE"
              state={
                currentReaction !== "FIRE" ? "inactive" : "active"
              }
              count={ currentReaction !== "FIRE" ? reactions.FIRE : 1}
              onPress={
                !preview
                  ? async () =>
                      {
                        
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          const reactionResponse = await addReaction(postId!, "FIRE")
          if (reactionResponse === true) {
            setReactions(handleReaction("FIRE", reactionState, () => setCurrentReaction(null), currentReaction))
            if (currentReaction === "FIRE") {
              setCurrentReaction(null)
            } else
            setCurrentReaction("FIRE")
          }
          else Toast.show({text1: "Something went wrong.", type: "error"})
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
                  ? async () =>{
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    const reactionResponse = await addReaction(postId!, "HEART")
                    if (reactionResponse === true) {
                      setReactions(handleReaction("HEART", reactionState, () => setCurrentReaction(null), currentReaction))
                      if (currentReaction === "HEART") {
                        setCurrentReaction(null)
                      } else
                      setCurrentReaction("HEART")
                    }
                    else Toast.show({text1: "Something went wrong.", type: "error"})}
                      
                  : () => {}
              }
              state={
                currentReaction !== "HEART" ? "inactive" : "active"
              }
            />
            <ReactionButton
                        initialReactionState={currentReaction}
              type="COOL"
              count={reactionState.COOL}
              onPress={
                !preview
                  ? async () =>{
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    const reactionResponse = await addReaction(postId!, "COOL")
                    if (reactionResponse === true) {
                      console.log(reactionState)
                      setReactions(handleReaction("COOL", reactionState, () => setCurrentReaction(null),  currentReaction))
                      if (currentReaction === "COOL") {
                        setCurrentReaction(null)
                      } else
                      setCurrentReaction("COOL")
                    }
                    else Toast.show({text1: "Something went wrong.", type: "error"})}
                  : () => {}
              }
              state={
                currentReaction !== "COOL"
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
              {authorUsername + "  "}
            </ThemedText>
            {description}
          </ThemedText>
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
