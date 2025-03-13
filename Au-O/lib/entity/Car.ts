/**
 * Autó entitások
 * @category Entity
 * @module entity/Car
 */

import { CarType } from '@/constants/types';
import { User } from './User';
/**
 * Autó létrehozásának kérésének entitása
 * @interface
 * @see Car
 * @see CarType
 */
export interface Car {
  /**
 * Autó azonosítója
 * @type {number}
 */
  id: number;
    /**
   * Autó márkája
   * @type {string}
   */
  manufacturer: string;
    /**
   * Autó modellje
   * @type {string}
   */
  model: string;
  /**
   * Autó típusa
   * @type {CarType}
   */
  type: CarType;
 /**
   * Autó lóerő értéke
   * @type {number}
   */
 horsepower: number;
 /**
  * Autó leírása
  * @type {string}
  */
 description: string;
 /**
  * Autó hengerűrtartalma
  * @type {number}
  */
 displacement: number;
 /**
  * Autó évjárata
  * @type {number}
  */
 productionYear: number;
  /**
  * Autó tulajdonosa
  * @type {User}
  */
  owner?: User;
}
