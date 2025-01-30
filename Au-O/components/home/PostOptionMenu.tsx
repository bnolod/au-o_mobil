import { PostCreationTexts } from "@/constants/texts";
import { ActionSheetIOS, Platform } from "react-native";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";
export default function PostOptionMenu(
  preview: boolean,
  language: "EN" | "HU",
  post_id: string,
  user_id: string | null,
  author_id: string | null
) {
  let iosOptions = [
    
    PostCreationTexts.options.cancel[language],
    PostCreationTexts.options.share[language],
    PostCreationTexts.options.report[language],
    
  ]
  console.log(author_id, user_id)
  if (author_id && author_id === user_id) {
    iosOptions.push(PostCreationTexts.options.edit[language])
  }
  async function handleShare() {
    await Clipboard.setStringAsync(post_id);
    Toast.show({
      type: "success",
      text1: PostCreationTexts.copied[language],
      position: "top",
      visibilityTime: 2000,
    });
  }
  async function handleReport() {
    console.log("report")
  }
  async function handleEdit() {
    if (author_id && user_id && (author_id === user_id)) {
      console.log("editing")
    }
  }
  if (preview) return null;
  if (Platform.OS === "ios") {
    return ActionSheetIOS.showActionSheetWithOptions(
      {
        options: iosOptions,
        cancelButtonIndex: 0,
        destructiveButtonIndex: 2,
      },
      async (buttonIndex) => {
        if (buttonIndex === 1) {
          await handleShare() 
        }
        if (buttonIndex === 2) {
          await handleReport()
        }
        if (buttonIndex === 3) {
          await handleEdit()
        }
      }
    );
  }
  else if (Platform.OS === "android") {
    
    return (
      <Picker
        onValueChange={async (itemIndex) => {
          if (itemIndex === 0) {
            return;
          }
          if (itemIndex === 1) {
            await handleShare()
          }
          if (itemIndex === 2) {
            await handleReport()
          }
          if (itemIndex === 3) {
            await handleEdit()
          }
        }}
      >
        <Picker.Item label={PostCreationTexts.options.cancel[language]} />
        <Picker.Item label={PostCreationTexts.options.share[language]} />
        <Picker.Item label={PostCreationTexts.options.report[language]} />
        {(user_id && user_id === author_id) && <Picker.Item label={PostCreationTexts.options.edit[language]} />}
      </Picker>
    );
  }
}
