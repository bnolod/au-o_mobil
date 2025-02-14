import { View } from "react-native";
import { Comment } from "@/constants/types";

import Avatar from "./Avatar";
import CollapsibleText from "./CollapsibleText";
export default function CommentDisplayElement({
  item
}: {
  item: Comment;
}) {
  return (
    <View className="h-20 mt-72 flex justify-center items-center flex-row w-full primary">
      <View className="flex flex-row items-center justify-center ">
        <View className="comment-avatar">
          <Avatar image={item.user.profileImg} nickname={item.user.nickname} />
        </View>
            <CollapsibleText className="basis-10/12" restrictedLineCount={3}>
              {item.text}
            </CollapsibleText>
      </View>
    </View>
  );
}
