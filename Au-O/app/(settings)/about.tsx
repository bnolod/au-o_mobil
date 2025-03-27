import { ScrollView, View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { Image } from 'expo-image';
import { Images } from '@/lib/staticAssetExports';
import { useColorScheme } from 'nativewind';
import { useLanguage } from '@/contexts/LanguageContext';
import { SettingsTexts } from '@/constants/texts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ReferenceDisplay from '@/components/settings/ReferenceDisplay';
export default function AboutPage() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  return (
    <ScrollView className="p-3 w-full flex mb-safe-offset-4 gap-2 background">
      <View className="flex flex-col gap-4 items-center">
        <View className="flex items-center gap-2">
          <Image
            source={colorScheme === 'light' ? Images.logo_black : Images.logo_white}
            style={{ width: 150, height: 75 }}
            contentFit='contain'
          />
          <View>
            <ThemedText className="txl text-center">2025 © Au-O</ThemedText>
            <ThemedText className="text-center">{SettingsTexts.aboutPage.allRights[language]}</ThemedText>
            <View className="divider w-96" />
            <ThemedText className="tlg">{SettingsTexts.aboutPage.madeBy[language]}</ThemedText>
            <ThemedText>Gyenes Bálint, Kiss Bence, Pásztor Márk</ThemedText>
          </View>
        </View>
        <View className="flex flex-col self-start p-2 rounded-xl w-full primary">
        <View>

          <View className="flex items-center flex-row gap-2">
            <ThemedText>
              <MaterialCommunityIcons name="github" size={48} />
            </ThemedText>
            <ThemedText className="t2x">{SettingsTexts.aboutPage.repositories[language]}</ThemedText>
          </View>
          <View className="divider w-96" />
          <View className="flex flex-col gap-2">
            <ReferenceDisplay icon="tablet" link="https://github.com/bnolod/au-o_mobil" text="Mobile" />
            <ReferenceDisplay icon="server-network" link="https://github.com/bnolod/au-o_backend" text="Backend" />
            <ReferenceDisplay icon="desktop-classic" link="https://github.com/bnolod/au-o_frontend" text="Web" />
          </View>
        </View>
      </View>
        <View className="flex flex-col self-start p-2 rounded-xl w-full primary">
          <View className="flex items-center flex-row gap-2">
            <ThemedText>
              <MaterialCommunityIcons name="file-document" size={48} />
            </ThemedText>
            <ThemedText className="t2x">{SettingsTexts.aboutPage.documentation[language]}</ThemedText>
          </View>
          <View className="divider w-96" />
          <View className="flex flex-col gap-2">
            <ReferenceDisplay icon="script-outline" link="https://bnolod.github.io/au-o_mobil/" text={`Readme & TypeDoc ${SettingsTexts.aboutPage.documentation[language]} `} />
          </View>
        </View>
        <View className="flex flex-col self-start p-2 rounded-xl w-full primary">
          <View className="flex items-center flex-row gap-2">
            <ThemedText>
              <MaterialCommunityIcons name="ruler-square" size={48} />
            </ThemedText>
            <ThemedText className="t2x">{SettingsTexts.aboutPage.design[language]}</ThemedText>
          </View>
          <View className="divider w-96" />
          <View className="flex flex-col gap-2">
            <ReferenceDisplay icon="database-outline" link="https://www.figma.com/design/ZMLoquJGEDi3lEhLdslQ9c/DB?node-id=0-1&t=yXzrJnaG0lKk8IWQ-1" text={language === "EN" ? "Database" : "Adatbázis"} />
            <ReferenceDisplay icon="tablet" link="https://www.figma.com/design/GDRSmJy5sZxZp7PKZ4rmtD/Mobil?node-id=0-1&t=RGddLvNoQA6Ijh1w-1" text={language === "EN" ? "Mobile" : "Mobil"} />
            <ReferenceDisplay icon="desktop-classic" link="https://www.figma.com/design/j9NffYp8ruYwC6iuz0Sgnp/Desktop?node-id=0-1&t=NxTs1zQXYbSjxCgD-1" text={language === "EN" ? "Desktop Web" : "Asztali Web"} />
            <ReferenceDisplay icon="presentation" link="https://www.figma.com/slides/9yKoTciIISnBTpzo4RTfS9/Prezent%C3%A1ci%C3%B3?node-id=52-67&t=zqSTNFfHgMRhbM6j-1" text={language === "EN" ? "Presentation" : "Prezentáció"} />
            <ReferenceDisplay icon="lightbulb-on-outline" link="https://www.figma.com/board/7v2i3Ps0qUoqlQQjlErx8S/Koncepci%C3%B3?node-id=0-1&t=tkAgw6px9pFRtndz-1" text={language === "EN" ? "Concept" : "Koncepció"} />
          </View>
        </View>
        </View>

    </ScrollView>
  );
}
