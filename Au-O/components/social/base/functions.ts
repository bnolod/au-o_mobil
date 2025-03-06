import { getOneImageFromGallery } from "@/lib/functions";

export async function openSocialGallery() {
    const res = await getOneImageFromGallery();
    if (res) {
      return(res);
    }
    else return null
  }