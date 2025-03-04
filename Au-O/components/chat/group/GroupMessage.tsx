import ThemedText from "@/components/ui/ThemedText";
import { View } from "react-native";
import { GroupMessageProps } from "../props";

export default function GroupMessage({user, sender, message, date}: GroupMessageProps) {
    return (
        <View className="w-full flex-1 flex-col my-1">
            <View className="flex flex-row gap-2">
<ThemedText className="text-highlight-light font-bold dark:text-highlight">
    {sender.username} {" "}
</ThemedText>
            <ThemedText className="leading-tight">
                {message}
            </ThemedText>
            </View>
            <ThemedText className="muted">
                {date}
            </ThemedText>
        </View>
    )
}