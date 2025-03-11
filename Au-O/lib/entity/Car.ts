import { CarType } from '@/constants/types';
import { User } from './User';
/**
 * @description Autó létrehozásának kérésének entitása
 * @param id Autó azonosítója
 * @param manufacturer Autó márkája
 * @param model Autó modell neve
 * @param type Autó típusa
 * @param horsepower Lóerő érték
 * @param description Leírás
 * @param displacement Hengerűrtartalom
 * @param productionYear Évjárat
 * @param owner Tulajdonos
 */
export interface Car {
  id: number;
  manufacturer: string;
  model: string;
  type: CarType;
  horsepower: number;
  description: string;
  displacement: number;
  productionYear: number;
  owner?: User;
}
