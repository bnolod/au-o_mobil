import Avatar from '@/components/ui/Avatar';
import ThemedText from '@/components/ui/ThemedText';
import { GroupMemberResponse } from '@/lib/entity/Group';
import { User } from '@/lib/entity/User';
import { router } from 'expo-router';
import {  Alert, Platform, Pressable, View } from 'react-native';

export default function MemberDisplay({ u, authorized, isCurrentUser }: { u: GroupMemberResponse, authorized: boolean, isCurrentUser: boolean }) {
  return (
      <Pressable onPress={isCurrentUser 
        ?
        authorized
            ? () => {} :
              () => router.push({pathname: "/(profile)/[id]", params: {id: u.user.id}}) : () => {
        {
            Platform.OS === 'ios' ? Alert.alert('Authorized Actions', "@" + u.user.username, [
                { text: 'Cancel', onPress: () => {}, style: "cancel" },
                { text: 'Visit Profile', onPress: () => router.push({pathname: "/(profile)/[id]", params: {id: u.user.id}}) },
                { text: 'Remove Member', onPress: () => {} }
            ]) : {}
        }
      }} className="flex-1 flex-row flex items-center justify-between secondary rounded-xl p-1 m-2">
    <View className='flex flex-row items-center'>
        <Avatar image={u.user.profileImg} nickname={u.user.nickname} />
        <View className="ml-2">
          <ThemedText className="text-base font-bold">{u.user.nickname}</ThemedText>
          <ThemedText className="tsm muted">@{u.user.username}</ThemedText>
        </View>
      </View>
      <View className="flex-col items-end mr-2">
          <ThemedText className="tsm">{u.role === "ADMIN" ? "Admin" : u.role === "MEMBER" ? "Member" : "" } since {u.joinedDate}</ThemedText>
          <ThemedText className="tsm font-semibold">{u.joinedDate ? u.joinedDate : "2025. 03. 06"}</ThemedText>

      </View>
    </Pressable>
  );
}
