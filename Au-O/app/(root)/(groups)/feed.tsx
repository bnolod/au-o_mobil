import SocialCard from "@/components/social/SocialCard";
import ThemedText from "@/components/ui/ThemedText";
import { useLanguage } from "@/contexts/LanguageContext";
import { Images } from "@/lib/staticAssetExports";
import { useColorScheme } from "nativewind";
import { ScrollView } from "react-native";

export default function GroupFeed() {
    const {language} = useLanguage();
    const {colorScheme} = useColorScheme();
    return (
        <ScrollView className="mt-24">
            <ThemedText>Group Feed</ThemedText>
            <SocialCard name="Civic Imádó Csoportos Indulás Közösség" image={Images.placeholder} type="GROUP" count={9090} language={language} colorScheme={colorScheme!} />
        </ScrollView>
    )
}