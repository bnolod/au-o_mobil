import { User } from "../entity/User";
import {CarType} from "../../constants/types";
export interface CarResponse {
            id: number;
            manufacturer: string;
            model: string;
            type: CarType;
            horsepower: number;
            description: string;
            displacement: number;
            productionYear: number;
            owner: User | null
          }

