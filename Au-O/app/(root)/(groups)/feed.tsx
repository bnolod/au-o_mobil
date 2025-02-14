import RootHeader from "@/components/home/RootHeader";
import NewSocial from "@/components/social/NewSocial";
import SocialCard from "@/components/social/SocialCard";
import SocialSort from "@/components/social/SocialSort";
import { Group } from "@/constants/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiFetch, getAllGroups, getGroup } from "@/lib/apiClient";
import { Images } from "@/lib/staticAssetExports";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export default function GroupFeed() {
  const { language } = useLanguage();
  const [groups, setGroups] = useState<Group[]>();
  const { colorScheme } = useColorScheme();
  async function fetchGroups() {
    const res = await getAllGroups()
    if (res) {setGroups(res)}
  }
useEffect(() => {
    fetchGroups()
    
}, [])
  return (
    <ScrollView  stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        <View className="primary rounded-b-xl">

      <RootHeader language={language} colorScheme={colorScheme!} />
      <SocialSort language={language} colorScheme={colorScheme!} />
      <NewSocial text="Create a new group" onPress={() => router.push("/(groups)/new")}/>
        </View>
        <FlashList estimatedFirstItemOffset={250} data={groups} keyExtractor={(item) => item.id} renderItem={({item}) => (
          <SocialCard type="GROUP" group={item} colorScheme={colorScheme!} language={language}/>
        )} />
        
      
    </ScrollView>
  );
}
