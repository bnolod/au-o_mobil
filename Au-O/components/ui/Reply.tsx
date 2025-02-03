import { Alert, Pressable, View } from "react-native";
import Avatar from "./Avatar";
import ThemedText from "./ThemedText";

import { useState } from "react";
import * as Haptics from "expo-haptics";
import { Reply } from "@/constants/types";
import { Text } from "react-native";
import { CommentTexts } from "@/constants/texts";
import { deleteReply } from "@/lib/apiClient";
import Toast from "react-native-toast-message";
export default function ReplyItem({
  item,
  language,
  userId,
  authorId,
  onDelete,
}: {
  item: Reply;
  language: "HU" | "EN";
  userId: number;
  authorId: number;
  onDelete: (id: number) => void;
}) {
  const [lines, setLines] = useState<number | undefined>(3);
  async function handleReplyDelete() {
    const res = await deleteReply(item.id);
    if (res === true) {
      onDelete(item.id);
      Toast.show({
        text1: CommentTexts.deletePrompt.success[language],
      })
    }
    else {
      Toast.show({
        text1: CommentTexts.deletePrompt.error[language],
      })
    }
  }
  return (
    <Pressable
      className="reply"
      onLongPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Alert.alert(
          `${item.user.nickname}${CommentTexts.commentAuthor[language]}`,
          "",
          [
            {
              text: CommentTexts.commentButtons.cancel[language],
              style: "cancel",
            },
            item.user.id === userId || authorId === userId
              ? {
                  text: CommentTexts.commentButtons.delete[language],
                  style: "destructive",
                  onPress: () => handleReplyDelete(),
                }
              : {},
          ]
        );
      }}
    >
      <View className="comment-header">
        <View className="reply-avatar">
          <Avatar image={item.user.profile_img} nickname={item.user.nickname} />
        </View>
        <View className="comment-user">
          <ThemedText className="text-lg font-semibold">
            {item.user.nickname}
          </ThemedText>
          <Text
            style={{
              color: "#767676",
              fontSize: 12,
            }}
          >
            @{item.user.username}
          </Text>
        </View>
      </View>
      <ThemedText
        numberOfLines={lines}
        onPress={() => {
          setLines(!lines ? 3 : undefined);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        {item.text}
      </ThemedText>
      {/* <View className="comment-reactions">
        <ReactionButton type="fire" count={0}></ReactionButton>
        <ReactionButton type="heart" count={1}></ReactionButton>
        <ReactionButton type="sunglasses" count={23}></ReactionButton>
      </View> */}
    </Pressable>
  );
}
