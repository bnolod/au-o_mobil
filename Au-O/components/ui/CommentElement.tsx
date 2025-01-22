import { View } from "react-native";
import ThemedText from "./ThemedText";
import { Comment } from "@/constants/types";
import Button from "./Button";
import ReactionButton from "./ReactionButton";

export default function CommentElement({text, replies}: {text: string, replies: Comment[]}) {
    return (
        <View className="mx-auto primary w-full p-2 flex flex-row items-center gap-2 justify-between">
            <ThemedText className="underline font-bold basis-1/12">{text.split(" ")[0].toLowerCase()}</ThemedText>
            <ThemedText className=" basis-9/12">{text}</ThemedText>
            <View className="basis-1/12">
            <ReactionButton type="fire" count={0}>
            </ReactionButton>
            </View>
        </View>
    )
}