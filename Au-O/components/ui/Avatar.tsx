import { AvatarProps } from "@/constants/types";
import { Image, ImageBackground, View } from "react-native";
import ThemedText from "./ThemedText";
import { Images } from "@/lib/staticAssetExports";

export default function Avatar({
  image,
  className,
  nickname,
  height = 14,
  width = 14,
}: AvatarProps) {
  if (image) {
    return (
      <Image
        source={{ uri: image }}
        className={`w-${width} h-${height} ${className} rounded-full`}
      />
    );
  } else if (!image && nickname) {
    return (
      <View
        className={`${className} ${
          className
            ? className
            : "bg-backdrop-secondary dark:bg-backdrop-secondary-dark overflow-hidden"
        } w-${width} h-${height} flex items-center justify-center text-center rounded-full`}
      >
        <ImageBackground
          source={Images.avatar_placeholder}
          imageStyle={{ borderRadius: 255 }}
          resizeMode="cover"
          
         className="flex-1 justify-center items-center rounded-full  w-full h-full"
        >
          <ThemedText className="text-lg font-black">
            {nickname[0].toUpperCase()}
            {nickname[1].toUpperCase()}
            {nickname[2].toUpperCase()}
          </ThemedText>
        </ImageBackground>
      </View>
    );
  } else if (!image && !nickname) {
    return (
      <View
        className={
          className
            ? className
            : " bg-backdrop-secondary dark:bg-backdrop-secondary-dark w-14 h-14 flex items-center justify-center text-center rounded-full"
        }
      >
        <ThemedText className="text-lg font-black">???</ThemedText>
      </View>
    );
  }
}
