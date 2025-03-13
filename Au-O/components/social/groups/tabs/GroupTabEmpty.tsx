/**
 * Csoport lista üres állapot
 * @module social/groups/tabs/GroupTabEmpty
 * @category Component
 */
import { View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { GroupTexts } from "@/constants/texts";

/**
 * @param {type: "POSTS" | "EVENTS", language: "EN" | "HU"} props Tulajdonságok
 */
export default function GroupTabEmpty({type, language}: {type: "POSTS" | "EVENTS", language: "EN" | "HU"}) {
    return (
        <View className="flex justify-center items-center">
        <MaterialCommunityIcons name={type === "POSTS" ? "cloud-question" : "calendar-question" } size={56} color={Colors.highlight.main} />
        <ThemedText>{GroupTexts.empty[type === "POSTS" ? "posts" : "events"][language]}</ThemedText>
    </View>
    );
}