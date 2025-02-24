import { ActivityIndicator } from "react-native";
import { ImageBackground } from "expo-image";
import { Images } from "@/lib/staticAssetExports";
import { Colors } from "@/constants/Colors";

export default function PostImageFallback() {
    return (
        <ImageBackground source={Images.banner_placeholder} contentFit="cover" style={{ opacity: 0.6, aspectRatio: 1, flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator size={"large"} color={Colors.highlight.main} />
        </ImageBackground>
    );
}