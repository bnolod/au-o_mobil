import { CarType } from '@/constants/types';
import { User } from './User';

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
