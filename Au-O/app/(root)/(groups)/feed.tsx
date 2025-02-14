import RootHeader from "@/components/home/RootHeader";
import NewSocial from "@/components/social/NewSocial";
import SocialCard from "@/components/social/SocialCard";
import SocialSort from "@/components/social/SocialSort";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiFetch } from "@/lib/apiClient";
import { Images } from "@/lib/staticAssetExports";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";

export default function GroupFeed() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  return (
    <ScrollView  stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        <View className="primary rounded-b-xl">

      <RootHeader language={language} colorScheme={colorScheme!} />
      <SocialSort language={language} colorScheme={colorScheme!} />
      <NewSocial text="Create a new group" onPress={() => router.push("/(groups)/new")}/>
        </View>
      <SocialCard
        type="GROUP"
        group={{
          id: "1",
          description: "This is a group",
          name: "Group 1",
          bannerImage: Images.placeholder,
          alias: "group1",
          memberCount: 10,
          public: true,
          creationDate: "2021-08-01",
          member: true,
        }}
        language={language}
        colorScheme={colorScheme!}
      />

    </ScrollView>
  );
}
