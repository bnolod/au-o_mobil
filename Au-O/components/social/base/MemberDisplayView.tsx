import Avatar from "@/components/ui/Avatar";
import ThemedText from "@/components/ui/ThemedText";
import { CommonStaticElementProps } from "@/constants/types";
import { GroupMemberResponse, Status } from "@/lib/entity/Group";
import { View } from "react-native";

export default function MemberDisplayView({
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