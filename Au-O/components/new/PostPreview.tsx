import { PostCardProps } from "@/constants/types";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import ThemedText from "../ui/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReactionButton from "../ui/ReactionButton";
import { useState } from "react";
import { formatDate } from "@/lib/functions";
import { HomeTexts, PostCreationTexts } from "@/constants/texts";
import AddCommentRow from "../home/AddCommentRow";

export default function PostPreview({
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
  onDismiss
}: PostCardProps & {onDismiss: () => void}) {
  
  const [lines, setLines] = useState<number | undefined>(3);

  function handleShowMore() {
    setLines(lines === 3 ? undefined : 3);
  }
  
  return (
    <View className="post-container flex justify-start gap-6 h-full">
      <View>

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
        {image && <Image source={{uri: image}} className="flex-1" resizeMode="contain" />}
      </View>
      <View className="post-footer">
        <View className="post-reaction-container">
          <View className=" gap-2 flex flex-row basis-7/12">
            <ReactionButton
              type="fire"
              count={12}
              />
            <ReactionButton
              type="heart"
              count={320}
              />
            <ReactionButton
              type="sunglasses"
              count={0}
              />
          </View>
          <View className="post-data-container">
            <ThemedText className=" text-highlight-light dark:text-highlight">
              hely koordinátákból
            </ThemedText>
            <ThemedText>{formatDate(date)}</ThemedText>
          </View>
        </View>
        <View className={`px-4 pt-2 pb-5  dark:bg-backdrop-primary-dark bg-backdrop-secondary`}>
          <ThemedText
            onPress={handleShowMore}
            ellipsizeMode="tail"
            className="text-lg leading-tight"
            
            numberOfLines={lines}
            >
            {description}
          </ThemedText>
        </View>
      </View>
            </View>
<Button type="fill" variant="highlight">
  {PostCreationTexts.confirmPost[language]}
</Button>
            
<Button type="fill" className="btn-outline btn-fill mx-auto rounded-xl py-2 btn-highlight" onPress={onDismiss}>
  {PostCreationTexts.cancel[language]}
</Button>
    </View>
  
  );
}
