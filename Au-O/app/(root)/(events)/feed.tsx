import RootHeader from '@/components/home/base/RootHeader';
import SocialSort from '@/components/social/base/SocialSort';
import ThemedText from '@/components/ui/ThemedText';
import { EventTexts } from '@/constants/texts';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from 'nativewind';
import { Text, View } from 'react-native';
export default function EventFeed() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  return (
    <>
      <View className="primary rounded-b-xl">
        <RootHeader language={language} colorScheme={colorScheme!} />
        <SocialSort language={language} colorScheme={colorScheme!} />
      </View>
      <View className='flex flex-col justify-center items-center'>
      <ThemedText className='txl'>
        {EventTexts.notAvailable[language]}
      </ThemedText>
      <Text className='text-highlight-light dark:text-highlight tlg'>
        {EventTexts.staytuned[language]}
      </Text>
     </View>
    </>
  );
}
