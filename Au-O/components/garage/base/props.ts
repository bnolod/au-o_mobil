/**
 * Garázs elemeket tartalmazó oldal tulajdonságai
 * @module garage/base/props
 * @category Components
 */

import { Car } from "@/lib/entity/Car";
import { Post } from "@/lib/entity/Post";
/**
 * Garázs elemeket tartalmazó oldal tulajdonságai
 * @interface
 */
export interface GarageItemPageProps {
  /**
   * Autó adatai
   * @type {Car}
   */
    car: Car;
    /**
     * A felhasználó tulajdonosa-e az autónak
     * @type {boolean}
     */
    isOwner: boolean;
    /**
     * A felhasználó profilképe
     * @type {string}
     */
    profileImg: string;
    /**
     * Az autóhoz tartozó bejegyzések
     * @type {Post[]}
     */
    posts: Post[]
  }