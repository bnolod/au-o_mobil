import { ScrollView, View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { GroupTabProps } from './props';
import { FlashList } from '@shopify/flash-list';
import UserListCard from '@/components/ui/UserListCard';
import { Colors } from '@/constants/Colors';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import AcceptUserTab from '../admin/AcceptUserTab';

export default function GroupInfoTab({ group, language, colorScheme }: GroupTabProps) {
  const {user} = useAuthentication()
  if (user)
  return (
    <ScrollView className='w-full'>
      <View className='flex w-full flex-col mt-2 '>

      <ThemedText>feltételezve hogy admin</ThemedText>
      <FlashList className='w-11/12 mx-auto flex flex-col'data={[user]} renderItem={() => <AcceptUserTab colorScheme={colorScheme!} language={language} user={user!}/>}  />
      </View>
    </ScrollView>
  );
}
