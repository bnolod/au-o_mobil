/**
 * Csoport tagság fül
 * @module social/groups/tabs/GroupInfoTab
 * @category Component
 */

import { ScrollView, View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { GroupTabProps, ProtectedGroupTabProps } from './props';
import { FlashList } from '@shopify/flash-list';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import AcceptUserTab from '../admin/AcceptUserTab';
import { GroupTexts } from '@/constants/texts';
import { UserResponse } from '@/lib/entity/User';
import { useEffect, useState } from 'react';
import { getPendingMembers } from '@/lib/ApiCalls/GroupApiCalls';
import { GroupMemberResponse } from '@/lib/entity/Group';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function GroupInfoTab({ group, language, colorScheme, status }: ProtectedGroupTabProps) {
  const {user} = useAuthentication()
  const [applications, setApplications] = useState<GroupMemberResponse[]>([]);

  useEffect(() => {
    getPending()
  }, [])

  async function getPending() {
    if (group && (status === 'ADMIN' || status === 'MODERATOR')) {
      const res = await getPendingMembers(group.id, status);
      if (res) {
        setApplications(res)
      }
    }
  }
  if (user)
  return (
    <ScrollView className='w-full'>
      <View className='flex w-full flex-col mt-2 '>

      <ThemedText className='txl text-center my-2'>{GroupTexts.verifyApplications[language]}</ThemedText>
      <FlashList ListEmptyComponent={() => (
        <View className='flex items-center gap-4'>
          <MaterialCommunityIcons name='check' size={64} color={Colors.highlight[colorScheme]} />
        <ThemedText className='txl text-center'>{GroupTexts.application.noneToResolve[language]}</ThemedText>
          </View>
      
      )} className='w-11/12 mx-auto flex flex-col'data={applications} renderItem={({item}) => <AcceptUserTab groupId={group.id} colorScheme={colorScheme!} language={language} user={item}/>}  />
      </View>
    </ScrollView>
  );
}
