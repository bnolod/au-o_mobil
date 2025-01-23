import { View } from "react-native";
import Avatar from "./Avatar";
import ThemedText from "./ThemedText";
import { boros_manifesto } from "@/constants/texts";
import ReactionButton from "./ReactionButton";
import { useState } from "react";
import * as Haptics from 'expo-haptics'
export default function Reply() {
        const [lines, setLines] = useState<number | undefined>(3);
  return (
    <View className="reply">
      <View className="comment-header">
        <View className="reply-avatar">
          <Avatar image={null} nickname={"teszt"} />
        </View>
        <View className="comment-user">
          <ThemedText className="text-lg font-semibold">Tesztiklész</ThemedText>
          <ThemedText className="">@teszt</ThemedText>
        </View>
      </View>
        <ThemedText numberOfLines={lines} onPress={() => {setLines(!lines ? 3 : undefined); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}}>
            {boros_manifesto.EN}
        </ThemedText>
                    <View className="comment-reactions">
                      <ReactionButton type="fire" count={0}></ReactionButton>
                      <ReactionButton type="heart" count={1}></ReactionButton>
                      <ReactionButton type="sunglasses" count={23}></ReactionButton>
                    </View>
    </View>
  );
}
