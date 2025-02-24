import { CarType } from "@/constants/types";

export interface CarTypeListItemProps {
    onPress: () => void;
    type: CarType;
    colorScheme: 'light' | 'dark';
  }