import { View } from "react-native";
import ThemedText from "../ui/ThemedText";
import { PostDispayElementProps } from "@/constants/types";

export default function PostAuthorDisplayElement({
  author_nickname,
  author_username,
  groupData,
  eventData,
  colorScheme,
  onPress,
  postType,
}: PostDispayElementProps) {
  return (
    <View className={`flex  ${postType !== "USER" ? "flex-row items-center gap-2 basis-6/12" : " basis-5/12 flex-col justify-center" }`}>
      <ThemedText className="text-xl font-semibold">
        {postType === "USER" && author_nickname}
        {postType === "GROUP" && <ThemedText><ThemedText>{groupData?.group_nickname}{" "} </ThemedText><ThemedText className="text-sm font-normal opacity-40">{groupData?.group_nickname.split(" ")[0].toUpperCase()}</ThemedText></ThemedText>}
        {postType === "EVENT" && eventData?.event_name}
        {postType === "INVALID" && "Invalid"}
      </ThemedText>
      <ThemedText className={`text-sm flex-wrap flex opacity-40`}>
        {postType === "USER" && "@" + author_username}
        
      </ThemedText>
    </View>
  );
}
