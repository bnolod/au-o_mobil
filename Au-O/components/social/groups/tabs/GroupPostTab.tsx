import { View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { FlashList } from "@shopify/flash-list";
import NewSocial from "../../base/NewSocial";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { GroupTabProps } from "./props";
import GroupTabEmpty from "./GroupTabEmpty";

export default function GroupPostTab({group, language}: GroupTabProps) {
    return (
        <FlashList estimatedItemSize={58} data={[]} renderItem={() => (
            <View>
                <ThemedText>Post</ThemedText>
            </View>
        )}
        ListHeaderComponent={() => (
            <NewSocial text="Post to group" />
        )}
        ListEmptyComponent={() => (
            <GroupTabEmpty type="POSTS" language={language} />
        )}
        />
    )
}