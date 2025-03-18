/**
 * Csoport tag megjelenítése
 * @module social/base/MemberDisplay
 * @category Components
 */
import Avatar from '@/components/ui/Avatar';
import ThemedText from '@/components/ui/ThemedText';
import { GroupMemberResponse, Status } from '@/lib/entity/Group';
import { router } from 'expo-router';
import { Alert, Platform, Pressable, View } from 'react-native';
import MemberActionSheet from '../groups/admin/MemberActionSheet';
import { CommonStaticElementProps } from '@/constants/types';
import { useState } from 'react';

export function MemberDisplayView({
  u,
  authorized,
  colorScheme,
  language,
  status,
  groupId,
}: {
  groupId: number;
  u: GroupMemberResponse;
  authorized: boolean;
  isCurrentUser: boolean;
  status: Status;
} & CommonStaticElementProps) {
  return (
    <View className=' flex-row flex items-center justify-between secondary rounded-xl p-1 m-2'>
    <View className="flex flex-row items-center">
    <Avatar image={u.user.profileImg} nickname={u.user.nickname} />
    <View className="ml-2">
      <ThemedText className="text-base font-bold">{u.user.nickname}</ThemedText>
      <ThemedText className="tsm muted">@{u.user.username}</ThemedText>
    </View>
  </View>
  <View className="flex-col items-end mr-2">
    <ThemedText className="tsm">
      {u.role === 'ADMIN' ? 'Admin' : u.role === 'MEMBER' ? 'Member' : ''} since {u.joinedDate}
    </ThemedText>
    <ThemedText className="tsm font-semibold">{u.joinedDate ? u.joinedDate : '2025. 03. 06'}</ThemedText>
  </View>
    </View>
  )
}

/**
 * @property {GroupMemberResponse} u - Tag
 * @property {boolean} authorized - Jogosultság
 * @property {boolean} isCurrentUser - Jelenlegi felhasználó
 */
export default function MemberDisplay({
  u,
  authorized,
  colorScheme,
  language,
  status,
  groupId,
  isCurrentUser
}: {
  groupId: number;
  u: GroupMemberResponse;
  authorized: boolean;
  isCurrentUser: boolean;
  status: Status;
} & CommonStaticElementProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <Pressable
      onPress={
        !authorized
          ? () => router.push({ pathname: '/(profile)/[id]', params: { id: u.user.id } })
          : () => {
              {
                /*
   Alert.alert('Authorized Actions', "@" + u.user.username, [
                { text: 'Cancel', onPress: () => {}, style: "cancel" },
                { text: 'Visit Profile', onPress: () => router.push({pathname: "/(profile)/[id]", params: {id: u.user.id}}) },
                { text: 'Remove Member', onPress: () => {} }
            ]) 
        */
              }
              setMenuVisible(true);
            }
      }
    >
      <MemberDisplayView isCurrentUser={isCurrentUser} u={u} authorized={authorized} colorScheme={colorScheme} language={language} status={status} groupId={groupId} />
      <MemberActionSheet
      isCurrentUser={isCurrentUser}
        groupId={groupId}
        setVisible={setMenuVisible}
        target={u}
        language={language}
        menuVisible={menuVisible}
        role={status}
        colorScheme={colorScheme}
      />
    </Pressable>
  );
}
