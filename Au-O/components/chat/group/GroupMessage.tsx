/**
 * GroupMessage.tsx
 * Csoport üzenet komponens
 * @module chat/group/GroupMessage
 * @category Components

 */
import ThemedText from "@/components/ui/ThemedText";
import { View } from "react-native";
import { GroupMessageProps } from "../props";
import Avatar from "@/components/ui/Avatar";
/**
 * Csoport üzenőfalon megjelenő komponens
 * @property {string} user Felhasználó
 * @property {string} sender Küldő
 * @property {string} message Üzenet
 * @property {string} date Dátum
 * @see GroupMessageProps
 * @returns 
 */
export default function GroupMessage({message}: GroupMessageProps) {
    return (
        <View className="w-full flex-1 flex-col m-1">
            <View className="flex flex-row items-center gap-2">
                <Avatar image={message.user.profileImg ? {uri: message.user.profileImg} : null } width={12} height={12} nickname={message.user.nickname}/>
<ThemedText className="text-highlight-light font-bold dark:text-highlight">
    {message.user.username} {" "}
</ThemedText>
            <ThemedText className="leading-tight">
                {message.message}
            </ThemedText>
            </View>
        </View>
    )
}