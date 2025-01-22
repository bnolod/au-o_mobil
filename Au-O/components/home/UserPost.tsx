import { PostCardProps } from "@/constants/types";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import ThemedText from "../ui/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReactionButton from "../ui/ReactionButton";
import { useState } from "react";
import { formatDate } from "@/lib/functions";
import { HomeTexts } from "@/constants/texts";

export default function PostCard({
  author_nickname,
  author_username,
  comments,
  date,
  description,
  image,
  location,
  reactions,
  language,
  colorScheme,
}: PostCardProps) {
  const [reactionState, setReactions] = useState<{
    fire: number;
    heart: number;
    sunglasses: number;
  }>({
    fire: reactions.fire,
    heart: reactions.heart,
    sunglasses: reactions.sunglasses,
  });
  const handleReaction = (type: "fire" | "heart" | "sunglasses") => {
    const newReactions = { ...reactionState };
    newReactions[type] =
      newReactions[type] === reactions[type]
        ? reactions[type] + 1
        : reactions[type];
    setReactions(newReactions);
  };
  return (
    <View className="post-container">
      <View className="post-header">
        <Button
          variant="transparent"
          className="m-0 basis-2/12"
          hapticFeedback="light"
        >
          <Avatar image={null} nickname={author_nickname} />
        </Button>
        <View className="flex flex-col basis-5/12 justify-center">
          <ThemedText className="text-xl font-semibold">
            {author_nickname}
          </ThemedText>
          <ThemedText className="text-sm opacity-40">
            @{author_username}
          </ThemedText>
        </View>
        <View className="flex flex-row basis-5/12 justify-end text-right">
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={42}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </View>
      </View>
      <View className="post-image">
        <Image source={image} className="w-full" />
      </View>
      <View className="post-footer">
        <View className="post-reaction-container">
        
          <View className=" gap-2 flex flex-row basis-7/12">
            <ReactionButton
              type="fire"
              state={
                reactionState.fire === reactions.fire ? "inactive" : "active"
              }
              count={reactionState.fire}
              onPress={() => handleReaction("fire")}
            />
            <ReactionButton
              type="heart"
              count={reactionState.heart}
              onPress={() => handleReaction("heart")}
              state={
                reactionState.heart === reactions.heart ? "inactive" : "active"
              }
            />
            <ReactionButton
              type="sunglasses"
              count={reactionState.sunglasses}
              onPress={() => handleReaction("sunglasses")}
              state={
                reactionState.sunglasses === reactions.sunglasses
                  ? "inactive"
                  : "active"
              }
            />
          </View>
          <View className="post-data-container">
            <ThemedText className=" text-highlight-light dark:text-highlight">
              hely koordinátákból
            </ThemedText>
            <ThemedText>{formatDate(date)}</ThemedText>
          </View>
        </View>
        <View className="px-2 py-2 dark:bg-backdrop-primary-dark bg-backdrop-secondary">
          <ThemedText>{description}</ThemedText>
        </View>
        <View className="post-comment-container">
          <View className="basis-1/12 flex justify-center items-center">
            <Avatar className="bg-backdrop-primary dark:bg-backdrop-primary-dark" image={null} nickname={"teszt"} height={12} width={12} />
          </View>
          <View className="basis-8/12">
            <TextInput className="bg-backdrop-primary dark:bg-backdrop-primary-dark  h-12 rounded-xl px-2"  placeholder={HomeTexts.post.comment_1[language] + " " + author_nickname + " " + HomeTexts.post.comment_2[language]} />
          </View>
          <View className="basis-2/12">
          <TouchableOpacity className="post-comment-input">
            
              <MaterialCommunityIcons name="comment-outline" size={24} color={colorScheme === "dark" ? "white" : "black"} />
            <ThemedText className="font-bold text-lg">
        
              {comments.length}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
