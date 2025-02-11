import { Image, ImageBackground, Pressable, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { Images } from "@/lib/staticAssetExports";
import { formatNumber } from "@/lib/functions";
import { CommonStaticElementProps } from "@/constants/types";
import { router } from "expo-router";

export default function SocialBanner({
  name,
  image,
  id,
  type = "GROUP",
  count = 0,
  language,
  colorScheme,
}: {
  name: string;
  id: string;
  image?: any;
  type?: "GROUP" | "EVENT";

  count?: number | null;
} & CommonStaticElementProps) {
  return (
    <Pressable
      onPress={() => {
        if (type === "EVENT") router.push({pathname:`/(root)/(events)/[id]`, params: {
          id
        }});
        else router.push({pathname:`/(root)/(groups)/[id]`, params: {
          id
        }})
      }}
      style={{
        aspectRatio: 3 / 1,
      }}
      className=" justify-center items-center flex w-full overflow-hidden"
    >
      <ImageBackground
        className="w-full h-full flex items-center justify-center secondary rounded-t-xl"
        source={Images.banner_placeholder}
      >
        {count !== null && (
          <ThemedText className=" z-50 p-2 secondary rounded-xl opacity-75 left-3 bottom-3 absolute">
            {formatNumber(count, language)}{" "}
            {type === "EVENT" ? "attendees" : "members"}
          </ThemedText>
        )}
        {!image && !name && <ThemedText className="text-3xl">???</ThemedText>}
        {!image && name && (
          <ThemedText className="text-5xl font-bold">
            {" "}
            {name.length > 20 && name.split(" ").length > 4
              ? name.split(" ")
              : name}
          </ThemedText>
        )}
        {image && name && (
          <Image
            className="h-full w-full rounded-t-xl"
            resizeMode="cover"
            source={image}
          />
        )}
      </ImageBackground>
    </Pressable>
  );
}
