/**
 * Csoport tag fül
 * @module social/groups/tabs/GroupMembersTab
 * @category Component
 */
import { FlashList } from "@shopify/flash-list";
import { GroupTabProps } from "./props";
import { useEffect, useState } from "react";
import MemberDisplay from "../../base/MemberDisplay";
import { GroupMemberListResponse } from "@/lib/entity/Group";
import { getGroupMembers } from "@/lib/ApiCalls/GroupApiCalls";
import Toast from "react-native-toast-message";
import { useAuthentication } from "@/contexts/AuthenticationContext";
/**
 * @param {GroupTabProps} props Tulajdonságok
 */
export default function GroupMembersTab({group, status, colorScheme, language} : GroupTabProps) {
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
    if (members && members.users && members.users.length > 0 && user)
    return (
        <FlashList estimatedItemSize={58} data={members.users} renderItem={({item, index}) => (
            <MemberDisplay groupId={group.id} status={status} colorScheme={colorScheme} language={language} u={item} isCurrentUser={item.user.id === user.id} authorized={status !== "MEMBER"}/>
        )}
        />
    )
}