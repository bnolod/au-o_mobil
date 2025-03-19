import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Linking, Pressable, View } from "react-native"
import ThemedText from "../ui/ThemedText"

export default function ReferenceDisplay({
    text,
    icon,
    link
}: {
    text: string,
    icon: keyof typeof MaterialCommunityIcons.glyphMap,
    link: string
}) {
    return (
        <Pressable onPress={() => {
            Linking.openURL(link)
        }} className="flex flex-row secondary w-11/12 p-3 m-1 rounded-xl items-center gap-2">
            <ThemedText>
            <MaterialCommunityIcons name={icon} size={32} />
            </ThemedText>
            <ThemedText className="txl">{text}</ThemedText>
        </Pressable>
    )
}