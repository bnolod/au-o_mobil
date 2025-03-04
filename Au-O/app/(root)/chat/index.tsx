import LoadingModal from '@/components/ui/LoadingModal';
import ThemedText from '@/components/ui/ThemedText';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { ScrollView, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useLanguage } from '@/contexts/LanguageContext';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FilterBar from '@/components/ui/FilterBar';
import { FlashList } from '@shopify/flash-list';
import DirectMessageItem from '@/components/chat/direct/DirectMessageItem';
import ChatHeader from '@/components/chat/base/ChatHeader';
export default function DirectMessagesScreen() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  const { user } = useAuthentication();
  if (!user) return <LoadingModal loading colorScheme={colorScheme!} />;
  else
    return (
      <>
        <ChatHeader mainPage user={user} onFilterChange={() => {}}/>
        <FlashList data={[1, 2, 3, 4]} renderItem={() => (<DirectMessageItem user={user} contact={user} date={new Date().toDateString()} lastMessage='kifejezetten hosszú sor amit törni kéne itt'/>)} />
      </>
    );
}
