import { View } from "react-native";
import ThemedText from "../../ui/ThemedText";
import { PostDispayElementProps } from "@/constants/types";

export default function PostAuthorDisplayElement({
  authorNickname,
  authorUsername,
  groupData,
  eventData,
  postType,
}: PostDispayElementProps) {
  return (
    <View className={`flex  ${postType !== "USER" ? "post-author-display-true" : " post-author-display-false" }`}>
      <ThemedText className="txl">
        {postType === "USER" && authorNickname}
        {postType === "GROUP" && <ThemedText><ThemedText>{groupData?.groupNickname}{" "} </ThemedText><ThemedText className="tsm font-normal opacity-40">{groupData?.groupNickname.split(" ")[0].toUpperCase()}</ThemedText></ThemedText>}
        {postType === "EVENT" && eventData?.eventName}
        {postType === "INVALID" && "Invalid"}
      </ThemedText>
      <ThemedText className={`tsm flex-wrap flex opacity-40`}>
        {postType === "USER" && "@" + authorUsername}
        
      </ThemedText>
    </View>
  );
}
