import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../ui/Button";
import { TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import Avatar from "../ui/Avatar";
import { EventPostData, GroupPostData, PostDispayElementProps } from "@/constants/types";

export default function PostHeaderElement({
onPress,
author_nickname,
author_username,
colorScheme,
postType,
eventData,
groupData
} : PostDispayElementProps
) {
  return (
    <Button
      variant="transparent"
      className="m-0 basis-2/12"
      onPress={onPress}
      hapticFeedback="light"
    >
      {postType === "USER" && (
        <Avatar image={null} nickname={author_nickname} />
      )}
      {postType === "GROUP" && !eventData && (
        <TouchableOpacity className="w-12 h-12 secondary rounded-xl flex justify-center items-center">
          <MaterialCommunityIcons
            name="account-group-outline"
            size={32}
            color={Colors[colorScheme].text}
          />
        </TouchableOpacity>
      )}
      {
postType === "GROUP" && eventData && (
  <TouchableOpacity className="w-12 h-12 secondary rounded-xl flex justify-center items-center">
    <MaterialCommunityIcons
      name="flag-checkered"
      size={32}
      color={Colors[colorScheme].text}
    />
  </TouchableOpacity>
)
      }
      {eventData && postType !== "GROUP" && (
        <TouchableOpacity className="w-12 h-12 secondary rounded-xl flex justify-center items-center">
          <MaterialCommunityIcons
            name="flag-outline"
            size={32}
            color={Colors[colorScheme].text}
          />
        </TouchableOpacity>
      )}
      {postType === "INVALID" && (
        <TouchableOpacity className="w-12 h-12 secondary rounded-xl flex justify-center items-center">
          <MaterialCommunityIcons
            name="message-question"
            size={32}
            color={Colors[colorScheme].text}
          />
        </TouchableOpacity>
      )}
    </Button>
  );
}
