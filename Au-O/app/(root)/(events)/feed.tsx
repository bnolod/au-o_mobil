import RootHeader from "@/components/home/RootHeader";
import SocialCard from "@/components/social/SocialCard";
import SocialSort from "@/components/social/SocialSort";
import ThemedText from "@/components/ui/ThemedText";
import { useLanguage } from "@/contexts/LanguageContext";
import { Images } from "@/lib/staticAssetExports";
import { useColorScheme } from "nativewind";
import { ScrollView, View } from "react-native";
export default function EventFeed() {
    const {language} = useLanguage();
    const {colorScheme} = useColorScheme();
  return (
    <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        <View className="primary rounded-b-xl">

      <RootHeader language={language} colorScheme={colorScheme!} />
      <SocialSort language={language} colorScheme={colorScheme!} />
        </View>
      <SocialCard
      id="1"
        name="Érdekes találkozó"
        image={Images.placeholder}
        type="EVENT"
        count={9090}
        language={language}
        colorScheme={colorScheme!}
      />
    </ScrollView>
  );
}
