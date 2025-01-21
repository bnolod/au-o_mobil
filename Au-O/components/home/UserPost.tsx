import { PostCardProps } from "@/constants/types";
import { View, Text, Image } from "react-native";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import ThemedText from "../ui/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReactionButton from "../ui/ReactionButton";
import { useState } from "react";

export default function PostCard({
  author_nickname,
  author_username,
  comments,
  date,
  description,
  image,
  location,
  reactions,
}: PostCardProps) {
    const [reactionState, setReactions] = useState<{ fire: number; heart: number; sunglasses: number }>({
        fire: reactions.fire,
        heart: reactions.heart,
        sunglasses: reactions.sunglasses,
    });
 
    const handleReaction = (type: 'fire' | 'heart' | 'sunglasses') => {
        const newReactions = { ...reactionState };
        newReactions[type] = newReactions[type] === reactions[type] ? reactions[type] + 1 : reactions[type];
        setReactions(newReactions);
    }
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
            color="white"
          />
        </View>
      </View>
      <View className="post-image">
        <Image source={image} className="w-full" />
      </View>
      <View className="post-footer">
        <View className="flex flex-row basis-7/12 gap-2">
            <ReactionButton type="fire" count={reactionState.fire} onPress={() => handleReaction("fire")} />
            <ReactionButton type="heart" count={reactionState.heart} onPress={() => handleReaction("heart")} />
            <ReactionButton type="sunglasses" count={reactionState.sunglasses} onPress={() => handleReaction("sunglasses")} />
        </View>
      </View>
    </View>
  );
}
