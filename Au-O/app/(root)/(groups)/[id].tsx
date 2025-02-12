import GroupPage from "@/components/social/groups/GroupPage";
import ThemedText from "@/components/ui/ThemedText";
import { Images } from "@/lib/staticAssetExports";
import { colorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollView } from "react-native";


export default function GroupDisplay() {
    return (
        <ScrollView className="h-screen background" >
            <GroupPage colorScheme={colorScheme.get()!} group={{
                id: "1",
                name: "Group 1",
                bannerImage: Images.placeholder,
                alias: "group1",
                memberCount: 10,
                isPublic: true,
                creationDate: "2021-08-01",
                isMember: true,

            }}  language="EN"/>
        </ScrollView>
    )
}