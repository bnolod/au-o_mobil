import { View } from "react-native";
import ThemedText from "../ui/ThemedText";
import { PostDispayElementProps } from "@/constants/types";

export default function PostAuthorDisplayElement({
  authorNickname,
  authorUsername,
  groupData,
  eventData,
  postType,
}: PostDispayElementProps) {
  return (
    <View className={`flex  ${postType !== "USER" ? "flex-row items-center gap-2 basis-6/12" : " basis-5/12 flex-col justify-center" }`}>
      <ThemedText className="text-xl font-semibold">
        {postType === "USER" && authorNickname}
        {postType === "GROUP" && <ThemedText><ThemedText>{groupData?.groupNickname}{" "} </ThemedText><ThemedText className="text-sm font-normal opacity-40">{groupData?.groupNickname.split(" ")[0].toUpperCase()}</ThemedText></ThemedText>}
        {postType === "EVENT" && eventData?.eventName}
        {postType === "INVALID" && "Invalid"}
      </ThemedText>
      <ThemedText className={`text-sm flex-wrap flex opacity-40`}>
        {postType === "USER" && "@" + authorUsername}
        
      </ThemedText>
    </View>
  );
}
