import { CarType } from '../../constants/types';
/**
 * @description Autó létrehozásának kérésének entitása
 * @param manufacturer Autó márkája
 * @param model Autó modell neve
 * @param type Autó típusa
 * @param horsepower Lóerő érték
 * @param description Leírás
 * @param displacement Hengerűrtartalom
 * @param productionYear Évjárat
 */
export interface CarCreationRequest {
  manufacturer: string;
  model: string;
  type: CarType;
  horsepower: number;
  description: string;
  displacement: number;
  productionYear: number;
}
