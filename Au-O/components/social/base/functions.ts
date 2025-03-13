/**
 * Szociális modul alapfunkciói
 * @module social/base/functions
 * @category Functions
 */
import { getOneImageFromGallery } from "@/lib/functions";
import { ImagePickerAsset } from "expo-image-picker";
/**
 * 
 * @returns {Promise<ImagePickerAsset | null>} - Egy kép vagy null
 */
export async function openSocialGallery() {
    const res = await getOneImageFromGallery();
    if (res) {
      return(res);
    }
    else return null
  }