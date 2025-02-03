import { Text, TouchableOpacity, View } from "react-native";
import ThemedText from "./ThemedText";
import { Comment } from "@/constants/types";
import ReactionButton from "./ReactionButton";
import Avatar from "./Avatar";
import { useState } from "react";
import * as Haptics from 'expo-haptics'
import Button from "./Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { colorScheme } from "nativewind";
export default function CommentDisplayElement({
  item
}: {
  item: Comment;
}) {
    const [lines, setLines] = useState<number | undefined>(3);
  return (
    <View className="h-20 mt-72 flex justify-center items-center flex-row w-full primary">
      <View className="flex flex-row items-center justify-center ">
        <View className="comment-avatar">
          <Avatar image={item.user.profile_img} nickname={item.user.nickname} />
        </View>
            <ThemedText className="basis-10/12" numberOfLines={lines} onPress={() => {setLines(!lines ? 3 : undefined); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}}>
              {item.text}
            </ThemedText>
      </View>
    </View>
  );
}
