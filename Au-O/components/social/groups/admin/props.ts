/**
 * Elfogadási felhasználó fül típusa
 * @module social/groups/admin/props
 * @category Props
 */
import { User } from "@/lib/entity/User";
/**
 * Elfogadási felhasználó fül tulajdonságai
 */
export interface AcceptUserTabProps {
    /**
     * Felhasználó
     * @type {User}
     * @see {User}
     */
    user: User
}