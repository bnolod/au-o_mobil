import { ImagePickerAsset } from "expo-image-picker";
/**
 * @description A poszt létrehozásához szükséges adatok
 * @param userId A poszt készítőjének azonosítója
 * @param description Poszt leírása
 * @param images Poszt képei
 * @param groupId Opcionális csoport azonosítója
 * @param location Poszt helyszíne
 * @param eventId Opcionális esemény azonosítója
 * @param vehicleId Opcionális jármű azonosítója
 */
export interface CreatePostRequest {
    userId: number;
    description: string;
    images: ImagePickerAsset[];
    groupId: number | null;
    location: string;
    eventId: number | null;
    vehicleId: number | null;
  }