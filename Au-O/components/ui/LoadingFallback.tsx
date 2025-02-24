import { ActivityIndicator, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import Animated from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
export default function LoadingFallback() {
    const {colorScheme} = useColorScheme();
    return (
        <Animated.View style={{backgroundColor: Colors[colorScheme!].primary}}>
            <ActivityIndicator size={"large"} color={Colors.highlight.main} />
        </Animated.View>
    );
}