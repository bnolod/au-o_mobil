import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ThemedText from "./ThemedText";
import { Comment, Reply } from "@/constants/types";
import ReactionButton from "./ReactionButton";
import Avatar from "./Avatar";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { colorScheme } from "nativewind";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { DeleteComment, sendReply } from "@/lib/apiClient";

import ReplyItem from "./Reply";
import Toast from "react-native-toast-message";
import { FlashList } from "@shopify/flash-list";
import { CommentTexts } from "@/constants/texts";
export default function CommentElement({
  item,
  language,
  userId,
  authorId,
  onDelete,
}: {
  item: Comment;
  language: "HU" | "EN";
  userId: number;
  onDelete: (id: number) => void;
  authorId: number;
}) {
  const [lines, setLines] = useState<number | undefined>(3);
  const [replying, setReplying] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>("");
  const [renderedReplies, setRenderedReplies] = useState<Reply[]>(
    item.replies ? item.replies : []
  );
  async function handleCommentDelete() {
    Alert.alert(CommentTexts.deletePrompt.message[language], "", [
      {
        text: CommentTexts.deletePrompt.buttons.cancel[language],
        style: "cancel",
      },
      {
        text: CommentTexts.deletePrompt.buttons.delete[language],
        style: "destructive",
        onPress: async () => {
          const res = await DeleteComment(item.id.toString());
          if (res === true) {
            onDelete(item.id);
            Toast.show({ text1: CommentTexts.deletePrompt.success[language] });
          } else
            Toast.show({ text1: CommentTexts.deletePrompt.error[language] });
        },
      },
    ]);
  }
  async function handleReplySend() {
    const res = await sendReply(item.id.toString(), replyText);
    if (res) {
      setReplyText("");
      setReplying(false);
      setRenderedReplies([res, ...renderedReplies]);
      Keyboard.dismiss();
      Toast.show({
        text1: CommentTexts.replyCreated.success[language],
        type: "success",
      });
    } else
      Toast.show({
        text1: CommentTexts.replyCreated.error[language],
        type: "error",
      });
  }

  return (
    <Pressable
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
            {
              text: CommentTexts.commentButtons.reply[language],
              onPress: () => setReplying(true),
            },
            item.user.id === userId || authorId === userId
              ? {
                  text: CommentTexts.commentButtons.delete[language],
                  style: "destructive",
                  onPress: () => handleCommentDelete(),
                }
              : {},
          ]
        );
      }}
      className="comment"
    >
      <View className="comment-header">
        <View className="comment-avatar">
          <Avatar image={item.user.profile_img} nickname={item.user.nickname} />
        </View>
        <View className="comment-user">
          <ThemedText className="text-lg font-semibold">
            {item.user.nickname}
          </ThemedText>
          <Text style={{ color: "#767676", fontSize: 12 }}>
            @{item.user.username}
          </Text>
        </View>
      </View>
      <View className="comment-body">
        <View className="flex flex-row">
          <View className="comment-reply-line-container">
            <View className="comment-reply-line" />
          </View>
          <View className="comment-text-body">
            <ThemedText
              className=" basis-8/12 "
              numberOfLines={lines}
              onPress={() => {
                setLines(!lines ? 3 : undefined);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              {item.text}
            </ThemedText>
            <View className="comment-reactions">
              <TouchableOpacity
                className="w-12 h-12 flex rounded-xl items-center justify-center secondary"
                onPress={() => setReplying(!replying)}
              >
                <MaterialCommunityIcons
                  name={replying ? "reply" : "reply-outline"}
                  size={32}
                  color={Colors[colorScheme.get()!].text}
                />
              </TouchableOpacity>
              <ReactionButton type="fire" count={0}></ReactionButton>
              <ReactionButton type="heart" count={1}></ReactionButton>
              <ReactionButton type="sunglasses" count={23}></ReactionButton>
            </View>
            {replying && (
              <View className="flex flex-row gap-2 items-center justify-center">
                <BottomSheetTextInput
                  value={replyText}
                  autoFocus
                  onChangeText={(text) => setReplyText(text)}
                  multiline
                  style={{
                    width: "auto",
                    height: 44,
                    backgroundColor: Colors[colorScheme.get()!].secondary,
                    marginTop: 4,
                    borderRadius: 8,
                    paddingHorizontal: 4,
                    color: Colors[colorScheme.get()!].text,
                    flexBasis: Dimensions.get("window").width * 0.7,
                  }}
                  placeholderTextColor={"#767676"}
                />
                <TouchableOpacity
                  className="w-12 h-12 flex rounded-xl items-center justify-center secondary"
                  onPress={handleReplySend}
                >
                  <MaterialCommunityIcons
                    name="send"
                    size={32}
                    color={Colors[colorScheme.get()!].text}
                  />
                </TouchableOpacity>
              </View>
            )}
            <View></View>
            {renderedReplies && (
              <FlashList
                estimatedItemSize={100}
                data={renderedReplies}
                renderItem={({ item }) => (
                  <ReplyItem userId={userId} authorId={authorId} language={language} onDelete={(id) => setRenderedReplies(renderedReplies.filter((item) => item.id !== id ))} key={item.id} item={item} />
                )}
              />
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}
