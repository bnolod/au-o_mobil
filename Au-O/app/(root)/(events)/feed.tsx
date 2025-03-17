import RootHeader from '@/components/home/base/RootHeader';
import SocialSort from '@/components/social/base/SocialSort';
import ThemedText from '@/components/ui/ThemedText';
import { Colors } from '@/constants/Colors';
import { EventTexts } from '@/constants/texts';
import { useLanguage } from '@/contexts/LanguageContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { ScrollView, Text, View } from 'react-native';
export default function EventFeed() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  return (

      <View className="primary flex flex-col justify-center items-center gap-8 h-screen rounded-b-xl">
    <View>
        {/* <RootHeader language={language} colorScheme={colorScheme!} /> 
        <SocialSort language={language} colorScheme={colorScheme!} />*/}
        <MaterialCommunityIcons name='calendar-blank-outline' style={{
          transform: [{ rotate: '14deg' }]
        }} size={128} color={Colors.highlight[colorScheme!]} />
      </View>
      <View className='flex flex-col justify-center  items-center'>
      <ThemedText className='t2x text-center mb-4 mx-6'>
        {EventTexts.notAvailable[language]}
      </ThemedText>
      <Text className='text-highlight-light text-center dark:text-highlight txl'>
        {EventTexts.staytuned[language]}
      </Text>
     </View>
    </View>
  );
}
