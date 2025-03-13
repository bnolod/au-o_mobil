/**
 * GroupMessage.tsx
 * Csoport üzenet komponens
 * @module chat/group/GroupMessage
 * @category Components

 */
import ThemedText from "@/components/ui/ThemedText";
import { View } from "react-native";
import { GroupMessageProps } from "../props";
/**
 * Csoport üzenőfalon megjelenő komponens
 * @property {string} user Felhasználó
 * @property {string} sender Küldő
 * @property {string} message Üzenet
 * @property {string} date Dátum
 * @see GroupMessageProps
 * @returns 
 */
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