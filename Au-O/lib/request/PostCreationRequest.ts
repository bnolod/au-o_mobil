import { ImagePickerAsset } from "expo-image-picker";

export interface CreatePostRequest {
    userId: number;
    description: string;
    images: ImagePickerAsset[];
    groupId: number | null;
    location: string;
    eventId: number | null;
    vehicleId: number | null;
  }