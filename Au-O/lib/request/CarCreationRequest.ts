import { CarType } from '../../constants/types';
/**
 * Autó létrehozásának kérésének entitása
 * @interface
 * @see Car
 * @see CarType
 */
export interface CarCreationRequest {
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
}
