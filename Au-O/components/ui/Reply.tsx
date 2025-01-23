import { View } from "react-native";
import Avatar from "./Avatar";
import ThemedText from "./ThemedText";
import { boros_manifesto } from "@/constants/texts";
import ReactionButton from "./ReactionButton";
import { useState } from "react";

export default function Reply() {
        const [lines, setLines] = useState<number | undefined>(3);
  return (
    <View className="primary w-full mt-2 gap-2 flex flex-col items-start justify-between">
      <View className="flex flex-row gap-2">
        <View className="flex flex-row items-center justify-center">
          <Avatar image={null} nickname={"teszt"} />
        </View>
        <View className="flex flex-col justify-center">
          <ThemedText className="text-lg font-semibold">Tesztiklész</ThemedText>
          <ThemedText className="">@teszt</ThemedText>
        </View>
      </View>
        <ThemedText numberOfLines={lines} onPress={() => setLines(!lines ? 3 : undefined)}>
            {boros_manifesto.EN}
        </ThemedText>
                    <View className="flex flex-row mt-2 gap-2">
                      <ReactionButton type="fire" count={0}></ReactionButton>
                      <ReactionButton type="heart" count={1}></ReactionButton>
                      <ReactionButton type="sunglasses" count={23}></ReactionButton>
                    </View>
    </View>
  );
}
