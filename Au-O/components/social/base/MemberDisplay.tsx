/**
 * Csoport tag megjelenítése
 * @module social/base/MemberDisplay
 * @category Components
 */
import { GroupMemberResponse, Status } from '@/lib/entity/Group';
import { router } from 'expo-router';
import { Pressable } from 'react-native';
import MemberActionSheet from '../groups/admin/MemberActionSheet';
import { CommonStaticElementProps } from '@/constants/types';
import { useState } from 'react';
import MemberDisplayView from './MemberDisplayView';



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
