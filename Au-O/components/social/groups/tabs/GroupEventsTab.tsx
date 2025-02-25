import { View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { FlashList } from "@shopify/flash-list";
import NewSocial from "../../base/NewSocial";
import { GroupTabProps } from "./props";
import { GroupTexts } from "@/constants/texts";
import GroupTabEmpty from "./GroupTabEmpty";

export default function GroupEventsTab({group, language} : GroupTabProps) {
    return (
        <FlashList estimatedItemSize={58} data={[]} renderItem={() => (
            <View>
                <ThemedText>Post</ThemedText>
            </View>
        )}
        ListHeaderComponent={() => (
            <NewSocial text={GroupTexts.buttons.newEvent[language]} />
        )}
        ListEmptyComponent={() => (
            <GroupTabEmpty type="EVENTS" language={language} />
        )}
        />
    )
}