import React from "react";
import { PostCreationTexts, PostStatusTexts } from "@/constants/texts";
import { ActionSheetIOS, Alert, Modal, Platform, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import ThemedText from "../ui/ThemedText";
import Button from "../ui/Button";
import { apiFetch } from "@/lib/apiClient";
export default function PostOptionMenu(
  preview: boolean,
  language: "EN" | "HU",
  post_id: number,
  user_id: number | null,
  author_id: number | null
) {
  if (preview) return null;
  let iosOptions = [
    PostCreationTexts.options.cancel[language],
    PostCreationTexts.options.share[language],
    PostCreationTexts.options.report[language],
  ];
  if (author_id && author_id === user_id) {
    iosOptions.push(PostCreationTexts.options.edit[language], PostCreationTexts.deletePost[language]);
  }
  async function handleShare() {
    await Clipboard.setStringAsync(post_id.toString());
    Toast.show({
      type: "success",
      text1: PostCreationTexts.copied[language],
      position: "top",
      visibilityTime: 2000,
    });
  }
  async function handleReport() {
    console.log("report");

  }
  async function handleEdit() {
    if (author_id && user_id && author_id === user_id) {
      router.push({ pathname: "/(post)/edit/[id]", params: { id: post_id } });
    }
  }
  async function handleDelete() {
    if (author_id && user_id && author_id === user_id) {
      Alert.alert("Post deletion", "Are you sure you want to delete this post?", [{
        text: PostStatusTexts.deletePrompt.buttons.cancel[language],
        style: "cancel",
      }, {
        text: PostStatusTexts.deletePrompt.buttons.delete[language],
        style: "destructive",
        onPress: async () => {
          //await apiFetch(`posts/delete/${post_id}`, "DELETE", true);
          router.navigate("/(root)/home");
        }
      }])
    }
  }

  if (Platform.OS === "ios") {
    return ActionSheetIOS.showActionSheetWithOptions(
      {
        options: iosOptions,

        cancelButtonIndex: 0,
        destructiveButtonIndex: 4,
        title: PostStatusTexts.options.title[language],
      },
      async (buttonIndex) => {
        if (buttonIndex === 1) {
          await handleShare();
        }
        if (buttonIndex === 2) {
          await handleReport();
        }
        if (buttonIndex === 3) {
          await handleEdit();
        }
        if (buttonIndex === 4) {
          await handleDelete();
        }
      }
    );
  } else if (Platform.OS === "android") {
    return (
      <Picker
        onValueChange={async (itemIndex) => {
          if (itemIndex === 0) {
            return;
          }
          if (itemIndex === 1) {
            await handleShare();
          }
          if (itemIndex === 2) {
            await handleReport();
          }
          if (itemIndex === 3) {
            await handleEdit();
          }
          if (itemIndex === 4) {
            await handleDelete();
          }
        }}
      >
        <Picker.Item label={PostCreationTexts.options.cancel[language]} />
        <Picker.Item label={PostCreationTexts.options.share[language]} />
        <Picker.Item label={PostCreationTexts.options.report[language]} />
        {user_id && user_id === author_id && (
          <>
          <Picker.Item color={Colors.highlight.main} label={PostCreationTexts.options.edit[language]} />
          <Picker.Item color={Colors.highlight.main} label={PostCreationTexts.deletePost[language]} />
          </>
        )}
      </Picker>
    );
  }
}
