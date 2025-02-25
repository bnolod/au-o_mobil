import { View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { FlashList } from "@shopify/flash-list";
import NewSocial from "../../base/NewSocial";
import { GroupTabProps } from "./props";

export default function GroupMembersTab({group, language} : GroupTabProps) {
    return (
        <FlashList estimatedItemSize={58} data={[0]} renderItem={() => (
            <View>
                <ThemedText>Member</ThemedText>
            </View>
        )}
        />
    )
}