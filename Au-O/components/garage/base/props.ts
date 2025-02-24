import { Car } from "@/lib/entity/Car";

export interface GarageItemPageProps {
    car: Car;
    isOwner: boolean;
    profileImg: string;
  }