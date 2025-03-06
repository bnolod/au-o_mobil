import { View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { FlashList } from "@shopify/flash-list";
import NewSocial from "../../base/NewSocial";
import { GroupTabProps } from "./props";
import { useEffect, useState } from "react";
import UserListCard from "@/components/ui/UserListCard";
import MemberDisplay from "../../base/MemberDisplay";
import { GroupMemberListResponse } from "@/lib/entity/Group";
import { getGroupMembers } from "@/lib/ApiCalls/GroupApiCalls";
import Toast from "react-native-toast-message";
import { useAuthentication } from "@/contexts/AuthenticationContext";

export default function GroupMembersTab({group, language, colorScheme} : GroupTabProps) {
        const [members, setMembers] = useState<GroupMemberListResponse>();
        const {user} = useAuthentication();
    async function init() {
        const res = await getGroupMembers(group.id);
        if (!res) return
        
        if (res.status === 409) {
            Toast.show({text1: "Error", text2: "You are not a member of this group", type: "error"})
            return
        }
        if (res.status === 200 && res.data) {
            setMembers(res.data)
        }
    }
    useEffect(() => {
        init()
    }, [])
    if (members && members.users.length > 0 && user)
    return (
        <FlashList estimatedItemSize={58} data={members.users} renderItem={({item, index}) => (
            <MemberDisplay u={item} isCurrentUser={item.user.id === user.id} authorized={members.users.some((member) => member.user.id === user.id && user.role === "ADMIN")}/>
        )}
        />
    )
}