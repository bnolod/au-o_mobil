import { CommentTexts, HomeTexts } from "@/constants/texts";
import { Keyboard, TextInput, View } from "react-native";
import Button from "../ui/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { AddCommentRowProps, Comment, CommonStaticElementProps } from "@/constants/types";
import { useState } from "react";
import { AddCommentToPost } from "@/lib/apiClient";
import Toast from "react-native-toast-message";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

export default function AddCommentRow({
  authorNickname,
  language,
  colorScheme,
  focus,
  postId,
  onPostComment,
}: AddCommentRowProps & CommonStaticElementProps) {
  const [commentText, setCommentText] = useState<string>("");
  async function handleSubmitComment() {
    const res = await AddCommentToPost(postId.toString(), commentText);
    if (res) {
      setCommentText("");
      onPostComment(res);
      Keyboard.dismiss();
      Toast.show({
        text1: CommentTexts.commentCreated.success[language],
        type: "success",
      });
    } else {
      Toast.show({
        text1: CommentTexts.commentCreated.error[language],
        type: "error",
      });
    }
  }
  return (
    <View className="flex flex-row mb-2 rounded-xl mx-auto justify-between gap-4 items-center">
      <View className="basis-10/12 rounded-xl">
        <BottomSheetTextInput
          value={commentText}
          autoFocus={focus}
          className="primary h-12 rounded-xl px-2"
          placeholderClassName="text-gray-500"
          placeholderTextColor={"#767676"}
          onChangeText={(text) => setCommentText(text)}
          style={{
            backgroundColor: Colors[colorScheme].primary,
            color: Colors[colorScheme].text,
          }}
          placeholder={
            HomeTexts.post.comment_1[language] +
            " " +
            authorNickname +
            " " +
            HomeTexts.post.comment_2[language]
          }
        />
      </View>
      <View className="basis-1/12">
        <Button
          className="primary h-12 w-12 rounded-xl justify-center items-center"
          onPress={handleSubmitComment}
        >
          <MaterialCommunityIcons
            name="send"
            size={24}
            color={Colors[colorScheme].text}
          />
        </Button>
      </View>
    </View>
  );
}
