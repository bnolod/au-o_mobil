/**
 * Elfogadási felhasználó fül típusa
 * @module social/groups/admin/props
 * @category Props
 */
import { GroupMemberResponse } from "@/lib/entity/Group";
import { User } from "@/lib/entity/User";
/**
 * Elfogadási felhasználó fül tulajdonságai
 */
export interface AcceptUserTabProps {
    /**
     * Felhasználó
     * @type {GroupMemberResponse}
     * @see {GroupMemberResponse}
     */
    user: GroupMemberResponse
    /**
     * Csoport azonosítója
     * @type {number}
     */
    groupId: number
}