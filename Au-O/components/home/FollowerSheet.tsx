import { BottomSheetFlashList, BottomSheetModal } from "@gorhom/bottom-sheet";
import UserListCard from "../ui/UserListCard";
import { CommonStaticElementProps, User } from "@/constants/types";
import { Colors } from "@/constants/Colors";
import ThemedText from "../ui/ThemedText";
import { TouchableOpacity, View } from "react-native";
import Button from "../ui/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { BottomSheetModalRef } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModalProvider/types";

export default function FollowerSheet({
  followers,
  following,
  colorScheme,
  language,
  isOwner,
  dismissSheet
}: { followers: User[]; following: User[], dismissSheet: () => void, isOwner: boolean } & CommonStaticElementProps) {
    const [data, setData] = useState<User[]>(followers);
  return (
    <BottomSheetFlashList
      ListHeaderComponent={() => (
        <View className="flex-row items-center justify-evenly">
          <TouchableOpacity className="flex items-center flex-col" onPress={() => setData(followers)}>
            <MaterialCommunityIcons
              name="account-check-outline"
              size={32}
              color={data === followers ? Colors.highlight.main : Colors[colorScheme].text}
            />
            <ThemedText className="text-lg font-bold p-2">Követők</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity className="flex items-center flex-col" onPress={() => setData(following)}>
            <MaterialCommunityIcons
              name="account-heart-outline"
              size={32}
              color={data === following ? Colors.highlight.main : Colors[colorScheme].text}
              />
            <ThemedText className="text-lg font-bold p-2">Követettek</ThemedText>
          </TouchableOpacity>
        </View>
      )}
      
      contentContainerStyle={{
        backgroundColor: Colors[colorScheme].background,
      }}
      estimatedItemSize={81}
      data={data}
        keyExtractor={(item, index) => item.id.toString()}
        ListEmptyComponent={() => (
            <View className="flex justify-center items-center w-full">
                <MaterialCommunityIcons name="account-search" size={64} color={Colors[colorScheme].text} />
                <ThemedText className="text-lg mt-24 font-bold text-center p-2">Nincs itt senki...</ThemedText>
            </View>
        )}
      renderItem={({ item, index }) => (
        <UserListCard
        isOwner={isOwner}
        dismissSheet={dismissSheet}
          user={item}
          type={data === followers ? "follower" : "following"}
          colorScheme={colorScheme}
          language={language}
        />
      )}
    />
  );
}
