import RootHeader from "@/components/home/RootHeader";
import SocialCard from "@/components/social/SocialCard";
import SocialSort from "@/components/social/SocialSort";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiFetch } from "@/lib/apiClient";
import { Images } from "@/lib/staticAssetExports";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";

export default function GroupFeed() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  return (
    <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        <View className="primary rounded-b-xl">

      <RootHeader language={language} colorScheme={colorScheme!} />
      <SocialSort language={language} colorScheme={colorScheme!} />
        </View>
      <SocialCard
        name="Civic Imádó Csoportos Indulás Közösség"
        image={Images.placeholder}
        type="GROUP"
        count={9090}
        language={language}
        colorScheme={colorScheme!}
        id={"1"}
      />

    </ScrollView>
  );
}
