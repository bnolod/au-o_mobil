import SocialCard from "@/components/social/SocialCard";
import ThemedText from "@/components/ui/ThemedText";
import { useLanguage } from "@/contexts/LanguageContext";
import { Images } from "@/lib/staticAssetExports";
import { useColorScheme } from "nativewind";
import { ScrollView } from "react-native";
export default function EventFeed() {
    const {language} = useLanguage();
    const {colorScheme} = useColorScheme();
  return (
    <ScrollView className="mt-24">
      <ThemedText>Event Feed</ThemedText>{" "}
      <SocialCard
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
