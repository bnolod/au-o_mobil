import { PostCreationTexts } from '@/constants/texts';
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { User } from './entity/User';
import { Group } from './entity/Group';
import { SocialEvent } from './entity/SocialEvent';
import { Image } from './entity/Image';

/**
 * 
 * @param {string} formKey Context-ben eltárolt űrlap kulcsa
 * @param {string} key Űrlapon belüli mező kulcsa
 * @param {string} value Kulcs által jelölt mező értéke
 * @param { (formKey: string) => any } getFormData Űrlap adat getter funkciója
 * @param {(formKey: string, data: any) => void} setFormData Űrlap funkció setter funkciója
 * @returns {void}
 */
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
/**
 * Aktuális időbélyeg mentése a SecureStore-ba
 * @async
 * @returns {Promise<void>}
 */
export async function setTimestamp() {
  await SecureStore.setItemAsync('timestamp', new Date().getTime().toString());
}
/**
 * Az aktuális időbélyeg lekérdezése a SecureStore-ból
 * @async
 * @returns {Promise<string | null>} Időbélyeg string
 */
export async function getTimestamp() {
  return await SecureStore.getItemAsync('timestamp');
}
/**
 * A poszt típusának meghatározása a megadott paraméterek alapján
 * @param {string} nickname Poszt készítőjének beceneve
 * @param {string} username Poszt készítőjének felhasználóneve
 * @param {Group} group Opcionális csoport entitás
 * @param {SocialEvent} event Opcionális esemény entitás
 * @returns {"USER" | "GROUP" | "EVENT" | "INVALID"} Poszt típusa
 */
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
/**
 * Időbélyeg létrehozása
 * @returns {string} Időbélyeg string
 */
export function createTimestamp() {
  return new Date().getTime().toString();
}
/**
 * Nem megfelelő képfeltöltések törlése
 * @async
 * @param {ImageUploadResponse[]} images Képek tömbje
 * @returns {Promise<void>}
 */
export async function cleanupInvalidImageUploads(images: Image[]) {
  images.map(async (image) => {
    await fetch(`https://api.imgur.com/3/image/${image.deleteHash}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Client-ID ${process.env.EXPO_PUBLIC_IMGUR_CLIENT_ID}`,
      },
    });
  });
}
/**
 * Kép konvertálása Base64 formátumba
 * @async
 * @param {string} image Kép entitás URI
 * @returns {Promise<string>} Kép Base64 string
 */
export async function convertToBlob(image: string): Promise<string> {
  const base64 = await FileSystem.readAsStringAsync(image, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return base64;
}
/**
 * Egy darab Kép kiválasztása a galériából
 * @async
 * @returns {Promise<ImagePicker.ImagePickerAsset | undefined>} Kép entitás
 */
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
/**
 * Több kép kiválasztása a galériából
 * @async
 * @param {ImagePicker.ImagePickerAsset[]} images Képek tömbje
 * @param {"HU" | "EN"} language Nyelv
 * @returns {Promise<ImagePicker.ImagePickerAsset[]>} Képek tömbje
 */
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
/**
 * Két string hasonlósági faktorát számolja ki
 * @param {string} s1 Elsődleges string
 * @param {string} s2 Másodlagos string
 * @returns {number} Hasonlósági faktor
 */
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
/**
 * Szűrési funkció
 * @param {string} query Lekérdezés
 * @param {any[]} items Szűrésre szánt elemek
 * @param {any} attribute Szűrésre szánt elem attribútuma
 * @returns {any[]} Szűrt elemek tömbje
 */
export const searchFilter = (query: string, items: any[], attribute: any) => {
  return items
    .map((item) => ({ item, score: getStringSimilarity(query, item[attribute].toLowerCase()) }))
    .filter(({ score }) => score > 0.5)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
};
/**
 * Felhasználó entitás elmentése a SecureStore-ba
 * @async
 * @param {User} user Felhasználó entitás
 */
export async function saveUser(user: User) {
  await SecureStore.setItemAsync('user', JSON.stringify(user));
}
/**
 * Felhasználó entitás törlése a SecureStore-ból
 * @async
 * @returns {Promise<void>}
 */
export async function deleteUser() {
  await SecureStore.deleteItemAsync('user');
}
/**
 * Validációt ellenőrző funkció
 * @returns {boolean} Validáció eredménye
 */
export function checkUser() {
  const user = SecureStore.getItem('user');
  if (user && user !== null) {
    return true;
  }
  return false;
}
/**
 * Dátum formázásáért felelő funkció
 * @param {string} date Dátum string
 * @returns {string} formattált dátum string
 */
export function formatDate(date: string) {
  return date.replaceAll('-', '. ') + '.';
}
/**
 * Hibaüzenet megjelenítése
 * @param {string} title Cím string
 * @param {string} message Üzenet string
 * @returns {void}
 */
export function showErrorToast(title: string, message?: string) {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
    visibilityTime: 5000,
  });
}
/**
 *  Többrészes űrlappá alakított kép feltöltésre kész elem létrehozása
 * @async
 * @param {ImagePicker.ImagePickerAsset} element Feltöltendő kép
 * @param {string} description Kép leírása
 * @param {User} user Feltöltést kezdeményező felhasználó entitás
 * @returns {Promise<FormData>} Többrészes űrlappá alakított kép feltöltésre kész elem
 */
export async function createImageForm(element: ImagePicker.ImagePickerAsset, description: string, user: User | null) {
  const imageForm = new FormData();
  const file = await convertToBlob(element.uri);
  imageForm.append('image', file);
  imageForm.append('description', description || '');
  imageForm.append('type', 'base64');
  imageForm.append('title', `${user!.username.replaceAll('_', '')}_${createTimestamp()}`);
  return imageForm;
}
/**
 * Szám formázása
 * @param {number} number Formázásra szánt szám
 * @param {"EN" | "HU"} language Nyelv
 * @returns {string} Formázott szám string
 */
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
