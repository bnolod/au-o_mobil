import { GroupPost } from "../entity/Group";
import { EventPost } from "../entity/SocialEvent";
/**
 * @description A poszt létrehozásához szükséges adatok
 * @param description Poszt leírása
 * @param groupData Opcionális csoport entitás
 * @param location Poszt helyszíne
 * @param eventData Opcionális esemény entitás
 * @param vehicleId Opcionális jármű azonosítója
 */
export interface PostEditRequest {
    description: string;
    groupData: GroupPost | null;
    eventData: EventPost | null;
    location: string;
    vehicleId: number | null;
  }