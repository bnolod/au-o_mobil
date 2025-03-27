import { ScrollView, View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { useColorScheme } from 'nativewind';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { SettingsTexts } from '@/constants/texts';
import SavedPostGrid from '@/components/home/user/SavedPostGrid';
import LoadingModal from '@/components/ui/LoadingModal';
export default function SavedPostsPage() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  const { user } = useAuthentication();
  if (!user) return <LoadingModal loading={!user} colorScheme={colorScheme!} />;
  return (
    <ScrollView className="flex flex-col background">
        <View className='flex flex-col w-full py-2 primary rounded-b-xl items-center'>
      <ThemedText className="m-auto p-2 text-center txl">{SettingsTexts.pages.savedHeader[language]}</ThemedText>
        <View className='divider w-2/3'/>
        </View>
      <SavedPostGrid userId={user.id} refreshing={false} colorScheme={colorScheme!} language={language} />
    </ScrollView>
  );
}
