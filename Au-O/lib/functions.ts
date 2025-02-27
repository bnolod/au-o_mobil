import { PostCreationTexts } from '@/constants/texts';
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { User } from './entity/User';
import { ImageUploadResponse } from './request/ImgurRequest';
import { Group } from './entity/Group';
import { SocialEvent } from './entity/SocialEvent';


export function handleFormInputChange(
  formKey: string,
  key: string,
  value: string,
  getFormData: (formKey: string) => any,
  setFormData: (formKey: string, data: any) => void
) {
  const data = getFormData(formKey);
  setFormData(formKey, {
    ...data,
    [key]: value,
  });
}
export async function setTimestamp() {
  await SecureStore.setItemAsync('timestamp', new Date().getTime().toString());
}
export async function getTimestamp() {
  return await SecureStore.getItemAsync('timestamp');
}
export function getPostType(
  nickname: string,
  username: string,
  group: Group | null,
  event: SocialEvent | null
): string {
  if (nickname && username) {
    if (!group && !event) {
      return 'USER';
    }
    if (!group && event) {
      return 'EVENT';
    }
    if ((group && event) || (group && !event)) {
      return 'GROUP';
    } else return 'INVALID';
  } else return 'INVALID';
}
export function createTimestamp() {
  return new Date().getTime().toString();
}
export async function cleanupInvalidImageUploads(images: ImageUploadResponse[]) {
  images.map(async (image) => {
    await fetch(`https://api.imgur.com/3/image/${image.deleteHash}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Client-ID ${process.env.EXPO_PUBLIC_IMGUR_CLIENT_ID}`,
      },
    });
  });
}
export async function convertToBlob(image: any): Promise<any> {
  const base64 = await FileSystem.readAsStringAsync(image, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return base64;
}
export async function getOneImageFromGallery() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    exif: false,
    quality: 0.7,
    allowsMultipleSelection: false,
  });
  if (!result.canceled) {
    return result.assets[0];
  }
}
export async function handleGallery(images: ImagePicker.ImagePickerAsset[], language: 'HU' | 'EN' = 'EN') {
  if (images.length < 10) {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      exif: false,
      quality: 0.7,
      allowsMultipleSelection: true,
      selectionLimit: 10 - images.length,
    });
    if (!result.canceled) {
      if (result.assets.length + images.length <= 10) {
        const newAssets = result.assets.filter((asset) => !images.some((image) => image.assetId === asset.assetId));
        if (newAssets.length < result.assets.length) {
          showErrorToast(
            PostCreationTexts.imageUploadDuplicateSafeguard.header[language],
            PostCreationTexts.imageUploadDuplicateSafeguard.message[language]
          );
        }
        const newImages = images.concat(newAssets);
        return newImages;
      }
    }
  }
}
export function getStringSimilarity(s1: string, s2: string) {
  function editDistance(a: string, b: string) {
    if (!a.length) return b.length;
    if (!b.length) return a.length;

    const matrix = Array(a.length + 1)
      .fill(null)
      .map(() => Array(b.length + 1).fill(null));

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
      }
    }
    return matrix[a.length][b.length];
  }

  const maxLenght = Math.max(s1.length, s2.length);
  return (maxLenght - editDistance(s1, s2)) / maxLenght;
} //köszönöm random fickó stackoverflown

export const searchFilter = (query: string, items: any[], attribute: any) => {
  return items
    .map((item) => ({ item, score: getStringSimilarity(query, item[attribute].toLowerCase()) }))
    .filter(({ score }) => score > 0.5)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
};

export async function saveUser(user: User) {
  await SecureStore.setItemAsync('user', JSON.stringify(user));
}
export async function deleteUser() {
  await SecureStore.deleteItemAsync('user');
}
export function checkUser() {
  const user = SecureStore.getItem('user');
  if (user && user !== null) {
    return true;
  }
  return false;
}
export function formatDate(date: string) {
  return date.replaceAll('-', '. ') + '.';
}
export function showErrorToast(title: string, message?: string) {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
    visibilityTime: 5000,
  });
}
export async function createImageForm(element: ImagePicker.ImagePickerAsset, description: string, user: User | null) {
  const imageForm = new FormData();
  const file = await convertToBlob(element.uri);
  imageForm.append('image', file);
  imageForm.append('description', description || '');
  imageForm.append('type', 'base64');
  imageForm.append('title', `${user!.username.replaceAll('_', '')}_${createTimestamp()}`);
  return imageForm;
}
export function formatNumber(number: number, language?: 'HU' | 'EN') {
  let lang = language || 'EN';
  if (number < 1000) {
    return number.toString();
  }
  const suffix = {
    EN: ['K', 'M', 'B', 'T'],
    HU: ['E', 'M', 'Mrd', 'B'],
  };
  let i = -1;
  let formatted = number;

  while (formatted >= 1000) {
    formatted /= 1000;
    i++;
  }
  return formatted >= 100 ? Math.round(formatted) + suffix[lang][i] : formatted.toFixed(1) + suffix[lang][i];
}
