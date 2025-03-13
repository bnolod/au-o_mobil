/**
 * Garázs lista elemek tulajdonságai
 * @module garage/list/props
 * @category Components
 */

import { CarType } from '@/constants/types';
import { Car } from '@/lib/entity/Car';
/**
 * Garázs lista tulajdonságai
 * @interface
 */
export interface CarTypeListItemProps {
  /**
   * Kattintási esemény
   * @returns {void}
   */
  onPress: () => void;
  /**
   * Autó típus
   * @type {CarType}
   * @see {CarType}
   */
  type: CarType;
  /**
   * Szín séma
   * @type {string}
   */
  colorScheme: 'light' | 'dark';
}
/**
 * Garázs elem tulajdonságai
 * @interface
 */
export interface GarageItemProps {
  /**
   * Autó adatai
   * @type {Car}
   */
  car: Car;
  /**
   * Kattintási esemény
   * @type {() => void}
   */
  onPress?: () => void;
  /**
   * Kiválasztási esemény
   * @type {() => void}
   */
  onSelect?: () => void;
  /**
   * Tulajdonos?
   * @type {boolean}
   */
  isOwner: boolean;
}
