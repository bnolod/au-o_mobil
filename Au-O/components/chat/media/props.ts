/**
 * @category Component
 * @module chat/media/props
 *  A felhasználó üzenete
*/
/**
 * Média üzenetekhez szükséges propok
 * @interface MediaMessageProps
 */
export interface MediaMessageProps {
    /**
     * Küldő-e?
     * @type {boolean}
     */
    sender: boolean
    /**
     * Felhasználó avatarja
     * @type {object | null}
     */
    avatar: {
        /**
         * Becenév
         * @type {string}
         */
        nickname: string
        /**
         * Profilkép
         * @type {string | null}
         */
        profileImg: string | null
    } | null
    /**
     * Színséma
     * @type {"dark" | "light"}
     */
    colorScheme: "dark" | "light";
}
/**
 * Posztot tartalmazó szükséges propok
 * @interface MessageProps
 * @extends MediaMessageProps
 */
export interface PostMessageProps extends MediaMessageProps {
    /**
     * Poszt azonosító
     * @type {number}
     * @see Post
     */
    postId: number;
}
/**
 * Csoport meghívót tartalmazó szükséges propok
 * @interface GroupInviteProps
 * @extends MediaMessageProps
 * @see Group
 */
export interface GroupInviteProps extends MediaMessageProps {
    /**
     * Csoport azonosító
     * @type {number}
     * @see Group
     */
    groupId: number;
}