import UserLoading from '@/components/auth/UserLoading';
import SettingsAside from '@/components/settings/SettingsAside';
import Footer from '@/components/ui/Footer';
import ThemedText from '@/components/ui/ThemedText';
import { SettingsTexts } from '@/constants/texts';
import { SettingsOption } from '@/constants/types';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { logout } from '@/lib/apiClient';
import { Redirect } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { ScrollView } from 'react-native';

export default function Settings() {
  const { colorScheme } = useColorScheme();
  const { language } = useLanguage();
  const settings: SettingsOption[] = [
    {
      icon: 'account-circle-outline',
      onPress: () => {},
      title: SettingsTexts.personal[language],
    },
    {
      icon: 'bookmark-outline',
      onPress: () => {},
      title: SettingsTexts.savedPosts[language],
    },
    {
      icon: 'progress-question',
      onPress: () => {},
      title: SettingsTexts.about[language],
    },
    {
      icon: 'logout',
      onPress: () => {
        logout();
      },
      title: SettingsTexts.logout[language],
      className: 'font-bold text-red-500',
    },
    {
      icon: 'delete-outline',
      onPress: () => {},
      title: SettingsTexts.deleteAccount[language],
    },
  ];
  const { user } = useAuthentication();
  if (user === null) {
    return <Redirect href="/login" />;
  }
  if (user === undefined) {
    return <UserLoading />;
  } else
    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          bounces={false}
          className="h-full w-full flex-1 primary"
        >
          <ThemedText className="w-full text-xl text-center p-3">{user.username}</ThemedText>

          <SettingsAside
            userId={user.id.toString()}
            username={user.username}
            colorScheme={colorScheme!}
            language={language}
            availableSettings={settings}
          />
        </ScrollView>
        <Footer language={language} />
      </>
    );
}
