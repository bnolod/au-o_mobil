import { View } from "react-native";
import ThemedText from "./ThemedText";
import { Comment } from "@/constants/types";
import Button from "./Button";

export default function CommentElement({text, replies}: {text: string, replies: Comment[]}) {
    return (
        <View className="mx-auto primary w-full p-2 flex flex-row items-center gap-2 justify-between">
            <ThemedText className="underline font-bold basis-1/12">{text.split(" ")[0].toLowerCase()}</ThemedText>
            <ThemedText className=" basis-9/12">{text}</ThemedText>
            <View className="basis-2/12">
            <Button className="secondary  w-12 h-12 rounded-xl justify-center items-center">
                <View className="flex flex-col items-center">

                <ThemedText className="text-xl">🔥</ThemedText>
                </View>
            </Button>
            </View>
        </View>
    )
}