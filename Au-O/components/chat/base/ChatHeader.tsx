import { Pressable, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import FilterBar from "@/components/ui/FilterBar";
import Avatar from "@/components/ui/Avatar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "@/components/ui/Button";
import { User } from "@/lib/entity/User";
import { ChatHeaderProps } from "../props";
import { router } from "expo-router";
import { generalTexts } from "@/constants/texts";

export default function ChatHeader({user, onFilterChange, mainPage, language}: ChatHeaderProps) {
    return (
        <View className="pt-safe px-3 secondary rounded-b-xl">
        <View className="flex flex-row items-center justify-between py-2">
          <Pressable onPress={() => {router.replace({pathname: "/(profile)/[id]", params: {id: user.id}})}} className="flex flex-row gap-4">
            <Avatar image={user.profileImg ?  user.profileImg : null} nickname={user.nickname} />
            <View className="flex justify-center">
              <ThemedText className="t2x">{user.nickname}</ThemedText>
              <ThemedText className="tsm muted">@{user.username}</ThemedText>
            </View>
          </Pressable>
          <Button className="button-fit primary p-1 rounded-xl">
            <MaterialCommunityIcons
              name="dots-vertical"
              size={32}
            />
          </Button>
        </View>
        {
            mainPage &&
            <FilterBar className="primary w-full mt-2" onChange={onFilterChange} placeholder={generalTexts.chat.filterBarPlaceholder[language]} />
        }
      </View>
    );
}