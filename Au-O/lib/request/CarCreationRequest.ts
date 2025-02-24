import { CarType } from '../../constants/types';

export interface CarCreationRequest {
  manufacturer: string;
  model: string;
  type: CarType;
  horsepower: number;
  description: string;
  displacement: number;
  productionYear: number;
}
