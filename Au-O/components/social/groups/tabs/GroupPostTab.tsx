import { View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { FlashList } from "@shopify/flash-list";
import NewSocial from "../../base/NewSocial";
import { GroupTabProps } from "./props";
import GroupTabEmpty from "./GroupTabEmpty";
import { router } from "expo-router";

export default function GroupPostTab({group, language}: GroupTabProps) {
    return (
        <FlashList estimatedItemSize={58} data={[]} renderItem={() => (
            <View>
                <ThemedText>Post</ThemedText>
            </View>
        )}
        ListHeaderComponent={() => (
            <NewSocial onPress={() => router.replace({pathname: "/(root)/(groups)/[id]/new", params: {id: group.id}})} text="Post to group" />
        )}
        ListEmptyComponent={() => (
            <GroupTabEmpty type="POSTS" language={language} />
        )}
        />
    )
}