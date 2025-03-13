/**
 * Poszt szerkesztésének kérésének entitása
 * @category Request
 * @module request/PostEditRequest
 */

import { GroupPost } from '../entity/Group';
import { EventPost } from '../entity/SocialEvent';
/**
 * A poszt létrehozásához szükséges adatok
 * @interface
 * @see Post
 * @see GroupPost
 */
export interface PostEditRequest {
  /**
   * A poszt leírása
   * @type {string}
   */
  description: string;
  /**
   * A poszt csoport adatai
   * @deprecated
   * @type {GroupPost | null}
   */
  groupData: GroupPost | null;
  /**
   * A poszt esemény adatai
   * @deprecated
   * @type {EventPost | null}
   */
  eventData: EventPost | null;
  /**
   * A poszt helye
   * @type {string}
   */

  location: string;
  /**
   * A poszthoz tartozó jármű azonosítója
   * @type {number | null}
   */
  vehicleId: number | null;
}
