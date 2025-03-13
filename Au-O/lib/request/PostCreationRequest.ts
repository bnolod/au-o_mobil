/**
 * Poszt létrehozásának kérésének entitása
 * @category Request
 * @module request/PostCreationRequest
 */

import { ImagePickerAsset } from 'expo-image-picker';
/**
 * A poszt létrehozásához szükséges adatok
 * @interface
 * @see Post
 * @see ImagePickerAsset
 */
export interface CreatePostRequest {
  /**
   * A poszt készítőjének azonosítója
   * @type {number}
   */
  userId: number;
  /**
   * A poszt leírása
   * @type {string}
   */
  description: string;
  /**
   * A poszthoz tartozó képek
   * @type {ImagePickerAsset[]}
   */
  images: ImagePickerAsset[];
  /**
   * A poszt csoport azonosítója
   * @type {number | null}
   */
  groupId: number | null;
  /**
   * A poszthoz tartozó esemény
   * @type {number | null}
   */
  eventId: number | null;
  /**
   * A poszt helyszíne
   * @type {string}
   */
  location: string;
  /**
   * A poszthoz tartozó jármű azonosítója
   * @type {number | null}
   */
  vehicleId: number | null;
}
