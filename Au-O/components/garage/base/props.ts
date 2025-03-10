import { Car } from "@/lib/entity/Car";
import { Post } from "@/lib/entity/Post";

export interface GarageItemPageProps {
    car: Car;
    isOwner: boolean;
    profileImg: string;
    posts: Post[]
  }