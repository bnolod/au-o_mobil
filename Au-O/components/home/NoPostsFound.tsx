import { View } from "react-native";
import ThemedText from "../ui/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { PostStatusTexts } from "@/constants/texts";

export default function NoPostsFound({language}: {language: "EN" | "HU"}) {
    return (
        <View className="flex m-auto justify-center items-center">
            <MaterialCommunityIcons name="cloud-question" size={64} color={Colors.highlight.main} />
            <ThemedText>{PostStatusTexts.notFound[language]}</ThemedText>
        </View>
    )
}