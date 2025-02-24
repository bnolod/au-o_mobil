import { CarType } from '@/constants/types';
import { Car } from '@/lib/entity/Car';

export interface CarTypeListItemProps {
  onPress: () => void;
  type: CarType;
  colorScheme: 'light' | 'dark';
}
export interface GarageItemProps {
  car: Car;
  onPress?: () => void;
  onSelect?: () => void;
  isOwner: boolean;
}
