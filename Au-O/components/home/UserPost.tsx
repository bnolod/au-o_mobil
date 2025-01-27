import { PostCardProps } from "@/constants/types";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import ThemedText from "../ui/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReactionButton from "../ui/ReactionButton";
import { useState } from "react";
import { formatDate } from "@/lib/functions";
import { HomeTexts } from "@/constants/texts";
import CommentSheet from "./CommentSheet";
import Carousel from "react-native-reanimated-carousel";

export default function PostCard({
  author_nickname,
  author_username,
  comments,
  date,
  description,
  images,
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
        {images.length !== 0 ?
          images.length > 1 ?
          <Carousel
          width={Dimensions.get("screen").width}
          data={images}
          loop={false}
          snapEnabled
          renderItem={({ index }) => (
            <Image source={{ uri: images[index].uri }} className="flex-1" resizeMode="contain"/>
          )}
          /> : <Image source={{ uri: images[0].uri }} className="flex-1" resizeMode="contain"/> : <></>
          }
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
              {location}
            </ThemedText>
            <ThemedText>{formatDate(date)}</ThemedText>
          </View>
        </View>
        <View
          className={`px-4 pt-2 pb-5  dark:bg-backdrop-primary-dark bg-backdrop-secondary`}
        >
          <ThemedText
            onPress={handleShowMore}
            ellipsizeMode="tail"
            className="text-lg leading-tight"
            numberOfLines={lines}
          >
            {description}
          </ThemedText>
        </View>

        <CommentSheet
          author_nickname={author_nickname}
          language={language}
          colorScheme={colorScheme}
          comments={comments}
        />
      </View>
    </View>
  );
}
