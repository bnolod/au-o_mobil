import axios from "axios";
import { ImageUploadResponse } from "../request/ImgurRequest";

export async function deleteImgurImage(deleteHash: string) {
  const req = await fetch(`https://api.imgur.com/3/image/${deleteHash}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Client-ID ${process.env.EXPO_PUBLIC_IMGUR_CLIENT_ID}`,
    },
  });
  if (req.status === 200) {
    return true;
  }
  return false;
}

export const imageUpload = async (image: FormData): Promise<ImageUploadResponse | null> => {
  const endpoint = 'https://api.imgur.com/3/image';
  const headers = {
    Authorization: `Client-ID ${process.env.EXPO_PUBLIC_IMGUR_CLIENT_ID}`,
    'Content-Type': 'multipart/form-data',
  };
  try {
    const response = await axios.post(endpoint, image, { headers });
    if (response.status !== 200) {
      return null;
    }
    const data = response.data.data;

    return {
      url: data.link,
      deleteHash: data.deletehash,
    };
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
};
