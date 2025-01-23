import { View } from "react-native";
import ThemedText from "./ThemedText";
import { Comment } from "@/constants/types";
import ReactionButton from "./ReactionButton";
import Avatar from "./Avatar";
import { boros_manifesto } from "@/constants/texts";
import Reply from "./Reply";
import { useState } from "react";
import * as Haptics from 'expo-haptics'
export default function CommentElement({
  text,
  replies,
}: {
  text: string;
  replies: Comment[];
}) {
    const [lines, setLines] = useState<number | undefined>(3);
  return (
    <View className="comment">
      <View className="comment-header">
        <View className="comment-avatar">
          <Avatar image={null} nickname={"teszt"} />
        </View>
        <View className="comment-user">
          <ThemedText className="text-lg font-semibold">Tesztiklész</ThemedText>
          <ThemedText className="">@teszt</ThemedText>
        </View>
      </View>
      <View className="comment-body">
        <View className="flex flex-row">
          <View className="comment-reply-line-container">
            <View className="comment-reply-line" />
          </View>
          <View className="comment-text-body">
            <ThemedText className=" basis-8/12 " numberOfLines={lines} onPress={() => {setLines(!lines ? 3 : undefined); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}}>
              {boros_manifesto.EN.split("'")[0]}
            </ThemedText>
            <View className="comment-reactions">
              <ReactionButton type="fire" count={0}></ReactionButton>
              <ReactionButton type="heart" count={1}></ReactionButton>
              <ReactionButton type="sunglasses" count={23}></ReactionButton>
            </View>
        <View className="w-full">
        {replies.map((reply) => (
               <Reply/>
            ))}
        </View>
          </View>
        </View>
      </View>
    </View>
  );
}
