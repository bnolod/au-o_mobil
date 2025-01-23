import { View } from "react-native";
import ThemedText from "./ThemedText";
import { Comment } from "@/constants/types";
import ReactionButton from "./ReactionButton";
import Avatar from "./Avatar";
import { boros_manifesto } from "@/constants/texts";
import Reply from "./Reply";
import { useState } from "react";

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
        <View className="flex flex-col items-start justify-center">
          <ThemedText className="text-lg font-semibold">Tesztiklész</ThemedText>
          <ThemedText className="">@teszt</ThemedText>
        </View>
      </View>
      <View className="flex flex-col self-end">
        <View className="flex flex-row">
          <View className="basis-2/12 flex h-auto  items-center justify-center">
            <View className="my-5 h-auto flex-1 bg-white w-1 rounded-full mx-auto" />
          </View>
          <View className="basis-10/12 flex-col flex">
            <ThemedText className=" basis-8/12 " numberOfLines={lines} onPress={() => setLines(!lines ? 3 : undefined)}>
              {boros_manifesto.EN.split("'")[0]}
            </ThemedText>
            <View className="flex flex-row mt-2 gap-2">
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
