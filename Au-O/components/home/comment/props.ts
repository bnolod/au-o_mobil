/**
 * Kommenthez tartozó propok
 * @module home/comment/props
 * @category Component
 */
import {Comment} from '@/lib/entity/Comment';

/**
 * Hozzászólás sor propok
 * @interface
 */
export interface AddCommentRowProps {
    /**
     * Létrehozó beceneve
     * @type {string}
     */
    authorNickname: string;
    /**
     * Fókuszban van-e
     * @type {boolean}
     */
    focus: boolean;
    /**
     * Poszt azonosító
     * @type {number}
     */
    postId: number;
    /**
     * Kommentelés esemény
     * @param res Komment
     * @returns {void}
     */
    onPostComment: (res: Comment) => void;
  }
  /**
   * Kommentek megjelenítése szolgáló sheet propok
   * @interface
   */
  export interface CommentSheetProps {
    /**
     * Kommentek
     */
    comments: Comment[];
    /**
     * Létrehozó beceneve
     */
    authorNickname: string;
    /**
     * Előnézet?
     */
    preview?: boolean;
    /**
     * Felhasználó beceneve
     * @type {string}
     */
    userNickname: string;
    /**
     * Poszt azonosító
     * @type {number}
     */
    postId: number;
    /**
     * Felhasználó profilképe
     * @type {string}
     */
    userProfileImg: string;
    /**
     * Author azonosító
     * @type {number}
     */
    authorId: number;
/**
 * Felhasználó azonosító
 * @type {number}
 */
    userId: number;
  }