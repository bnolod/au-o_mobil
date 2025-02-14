import { View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import Button from "../ui/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NewSocialProps } from "@/constants/types";

export default function NewSocial({text, onPress}: NewSocialProps) {
    return (
        <Button className="button w-11/12 my-2 mx-auto highlight-themed" hapticFeedback="light" onPress={onPress}>
            <View className="flex flex-col w-full mx-auto text-center gap-2 justify-center items-center">
                <View>

            <MaterialCommunityIcons name="plus" size={32} color="white" />
                </View>
            <ThemedText className="text-white">{text}</ThemedText>
            </View>
        </Button>
    );
}