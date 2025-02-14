import GroupPage from "@/components/social/groups/GroupPage";
import ThemedText from "@/components/ui/ThemedText";
import { Images } from "@/lib/staticAssetExports";
import { colorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollView } from "react-native";


export default function GroupDisplay() {
    return (
        <ScrollView className="h-screen background"  showsVerticalScrollIndicator={false} overScrollMode="never"  bounces={false}>
            <GroupPage colorScheme={colorScheme.get()!} group={{
                id: "1",
                name: "Group 1",
                bannerImage: Images.placeholder,
                alias: "group1",
                memberCount: 10,
                public: true,
                creationDate: "2021-08-01",
                member: true,
                description: "This is a group"
            }}  language="EN"/>
        </ScrollView>
    )
}