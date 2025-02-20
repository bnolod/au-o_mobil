import { ImageBackground, Pressable, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import {
  CommonStaticElementProps,
  Group,
} from "@/constants/types";
import { Images } from "@/lib/staticAssetExports";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { formatNumber } from "@/lib/functions";

export default function GroupListItem({
  group,
  colorScheme,
  language,
  onPress,
}: { group: Group; onPress: () => void } & CommonStaticElementProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        shadowColor: Colors[colorScheme].background,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
      }}
    >
      <View className="flex my-2 mx-2 flex-row overflow-hidden justify-between pr-3 items-center rounded-xl secondary h-24">
        <View className="basis-5/12 h-full overflow-hidden rounded-l-xl">
          <ImageBackground
            resizeMode="cover"
            className="flex-1 opacity-80 flex justify-center items-center"
            source={
              group.bannerImage ? {uri: group.bannerImage} : Images.banner_placeholder
            }
          >
            <ThemedText className="text-center text-2xl font-black ">
              {group.alias.toUpperCase()}
            </ThemedText>
          </ImageBackground>
        </View>

        
        <View className="flex flex-1 h-full items-center flex-row" style={{

                  boxShadow: "-10px 0px 40px 40px " + Colors[colorScheme!].secondary,
                  shadowColor: Colors[colorScheme!].secondary,
        }}>

        <ThemedText className="text-2xl justify-self-start self-center font-bold ">{group.name}</ThemedText>
        </View>
        <View className="flex-col opacity-60 flex items-center">
          <View className="flex flex-col items-center gap-2">
            <ThemedText className="">
              {group.public ? "Public" : "Private"}
            </ThemedText>

            <View className="flex flex-row justify-center items-center gap-1">
              <ThemedText className=" font-bold  items-center flex">
                {formatNumber(group.memberCount)}
              </ThemedText>
              <MaterialCommunityIcons
                color={Colors[colorScheme!].text}
                name="account-group-outline"
                size={24}
              />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
