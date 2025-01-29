import { PostCreationTexts } from "@/constants/texts";
import { ActionSheetIOS, Platform } from "react-native";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";
export default function PostOptionMenu(
  preview: boolean,
  language: "EN" | "HU",
  post_id: string
) {
  if (preview) return null;
  if (Platform.OS === "ios") {
    return ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          PostCreationTexts.options.cancel[language],
          PostCreationTexts.options.share[language],
          PostCreationTexts.options.edit[language],
          PostCreationTexts.options.report[language],
        ],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 3,
      },
      async (buttonIndex) => {
        if (buttonIndex === 1) {
          await Clipboard.setStringAsync(post_id);
          Toast.show({
            type: "success",
            text1: PostCreationTexts.copied[language],
            position: "top",
            visibilityTime: 2000,
          });
        }
        if (buttonIndex === 2) {
          console.log("Reported post");
        }
        if (buttonIndex === 2) {
          console.log("edit");
        }
      }
    );
  }
  else if (Platform.OS === "android") {
    
    return (
      <Picker
        onValueChange={async (itemIndex) => {
          if (itemIndex === 2) {
            return;
          }
          if (itemIndex === 0) {
            await Clipboard.setStringAsync(post_id);
            Toast.show({
              type: "success",
              text1: PostCreationTexts.copied[language],
              position: "top",
              visibilityTime: 2000,
            });
          }
          if (itemIndex === 1) {
            console.log("Reported post");
          }
        }}
      >
        <Picker.Item label={PostCreationTexts.options.share[language]} />
        <Picker.Item label={PostCreationTexts.options.edit[language]} />
        <Picker.Item label={PostCreationTexts.options.report[language]} />
        <Picker.Item label={PostCreationTexts.options.cancel[language]} />
      </Picker>
    );
  }
}
