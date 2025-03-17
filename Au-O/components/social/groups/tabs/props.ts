/**
 * Csoport fül tulajdonságok
 * @module social/groups/tabs/props
 * @category Props
 */
import { Group } from "@/lib/entity/Group";
/**
 * Csoport fül tulajdonságai
 * @interface GroupTabProps
 */
export interface GroupTabProps {
    /**
     * Csoport
     * @type {Group}
     * @see {Group}
     */
    group: Group;
    /**
     * Nyelv
     * @type {"EN" | "HU"}
     */
    language: "EN" | "HU";
    /**
     * Színséma
     * @type {"light" | "dark"}
     */
    colorScheme: "light" | "dark";
    status: "ADMIN" | "MEMBER" | "MODERATOR"
}