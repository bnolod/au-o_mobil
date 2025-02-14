import RootHeader from "@/components/home/RootHeader";
import SocialCard from "@/components/social/SocialCard";
import SocialSort from "@/components/social/SocialSort";
import { useLanguage } from "@/contexts/LanguageContext";
import { Images } from "@/lib/staticAssetExports";
import { useColorScheme } from "nativewind";
import { ScrollView, View } from "react-native";
export default function EventFeed() {
    const {language} = useLanguage();
    const {colorScheme} = useColorScheme();
  return (
    <ScrollView  stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        <View className="primary rounded-b-xl">

      <RootHeader language={language} colorScheme={colorScheme!} />
      <SocialSort language={language} colorScheme={colorScheme!} />
        </View>
      <SocialCard
        type="EVENT"
        event={{
          description: "This is an event",
          id: "1",
          name: "Event 1",
          bannerImage: Images.placeholder,
          attendees: 10,
          public: true,
          creationDate: "2021-08-01",
          isAttending: true,
          endDate: "2021-08-02",
          location: "Budapest",
          startDate: "2021-08-01",
        }}
        language={language}
        colorScheme={colorScheme!}
      />
    </ScrollView>
  );
}
