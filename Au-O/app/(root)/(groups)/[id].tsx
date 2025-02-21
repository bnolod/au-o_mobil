import GroupPage from "@/components/social/groups/GroupPage";
import { useColorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Group } from "@/constants/types";
import { router, useLocalSearchParams } from "expo-router";
import LoadingModal from "@/components/ui/LoadingModal";
import { getGroup } from "@/lib/ApiCalls/GroupApiCalls";

export default function GroupDisplay() {
  const { language } = useLanguage();
  const { id} = useLocalSearchParams()
  const { colorScheme } = useColorScheme();
  const [group, setGroup] = useState<Group | undefined | null>(undefined);
  useEffect(() => {
fetchGroup()
  }, []);
  async function fetchGroup() {
    if (id) {
        const res = await getGroup(id as string)
        if (res) {
          setGroup(res);
        }
        else setGroup(null);
    }
  }
  if (group === undefined) return <LoadingModal loading colorScheme={colorScheme!} />;
  if (group === null) {
    router.back()
  }
  if (group)
  return (
    <ScrollView
      className="h-screen background"
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      bounces={false}
    >
      <GroupPage
        colorScheme={colorScheme!}
        group={{
          id: group.id,
          name: group.name,
          bannerImage: group.bannerImage,
          alias: group.alias,
          memberCount: group.memberCount,
          public: group.public,
          creationDate: group.creationDate,
          member: group.member,
          description: group.description,
        }}
        language={language}
      />
    </ScrollView>
  );
}
