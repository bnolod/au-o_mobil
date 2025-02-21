import { Image, ImageBackground, Pressable, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { Images } from "@/lib/staticAssetExports";
import { Colors } from "@/constants/Colors";
import { colorScheme } from "nativewind";
import { SocialSortItemProps } from "@/constants/types";

export default function SocialSortItem({
  bannerImage,
  name,
  memberCount,
  onSelect,
}: SocialSortItemProps) {
  return (
    <Pressable
      onPress={onSelect}
      className="social-sort-item-container"
    >
      <View className="social-sort-image">
        <ImageBackground
          resizeMode="cover"
          className="flex-1"
          source={
            bannerImage !== null ? bannerImage : Images.banner_placeholder
          }
        />
      </View>
      <View
        className="social-sort-item-data"
        style={{
          shadowColor: Colors[colorScheme.get()!].secondary,
          shadowOffset: {
            width: -20,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 10,
        }}
      >
        <ThemedText className="text-2xl">{name}</ThemedText>
        <ThemedText className="tlg">
          {name === "My Groups" ? "All your groups" : memberCount}{" "}
          {name !== "My Groups" && "members"}
        </ThemedText>
      </View>
    </Pressable>
  );
}
