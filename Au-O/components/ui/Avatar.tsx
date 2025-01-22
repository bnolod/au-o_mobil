import { AvatarProps } from "@/constants/types";
import { Image, View } from "react-native";
import ThemedText from "./ThemedText";

export default function Avatar({image, className, nickname, height = 14, width = 14} : AvatarProps) {
    if (!image && nickname) {
        return (
             
            <View className={`${className} ${className ? className : "bg-backdrop-secondary dark:bg-backdrop-secondary-dark"} w-${width} h-${height} flex items-center justify-center text-center rounded-full`}>
                <ThemedText className="text-lg font-black">{nickname[0].toUpperCase()}{nickname[1].toUpperCase()}{nickname[2].toUpperCase()}</ThemedText>
            </View>
        )
    }
    if (!image && !nickname) {
        return (
            <View className={className ? className : " bg-backdrop-secondary dark:bg-backdrop-secondary-dark w-14 h-14 flex items-center justify-center text-center rounded-full"}>
                <ThemedText className="text-lg font-black">???</ThemedText>
            </View>
        )
    }
    return (
        <Image source={image} className={"w-14 h-14 rounded-full"}/>
    )
} 