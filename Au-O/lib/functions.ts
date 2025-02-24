import { PostCreationTexts, UIErrorTexts } from '@/constants/texts';
import { EventPostData, GroupPostData, ImageUploadResponse } from '@/constants/types';
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { User } from './entity/User';

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
  groupData?: GroupPostData,
  eventData?: EventPostData
): string {
  if (nickname && username) {
    if (!groupData && !eventData) {
      return 'USER';
    }
    if (!groupData && eventData) {
      return 'EVENT';
    }
    if ((groupData && eventData) || (groupData && !eventData)) {
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
          Toast.show({
            type: 'error',
            text1: PostCreationTexts.imageUploadDuplicateSafeguard.header[language],
            text2: PostCreationTexts.imageUploadDuplicateSafeguard.message[language],
          });
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

export function validateLogin(identifier: string, password: string, language: 'HU' | 'EN' = 'EN') {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  const minCharactersRegex = new RegExp(`^.{${process.env.EXPO_PUBLIC_MIN_PASSWORD_CHARACTER_LENGTH || 8},}$`);
  const noCapitalLettersRegex = /^(?=.*[A-Z])/;
  const noSmallLettersRegex = /^(?=.*[a-z])/;
  const noNumbersRegex = /^(?=.*\d)/;
  const noSpecialCharactersRegex = /^(?=.*\W)/;

  const errors: string[] = [];

  if (!emailRegex.test(identifier) && !usernameRegex.test(identifier)) {
    errors.push(UIErrorTexts.email.invalidEmail[language]);
  }

  if (!minCharactersRegex.test(password)) {
    errors.push(UIErrorTexts.password.minCharacters[language]);
  }
  if (!noCapitalLettersRegex.test(password)) {
    errors.push(UIErrorTexts.password.noCapitalLetters[language]);
  }
  if (!noSmallLettersRegex.test(password)) {
    errors.push(UIErrorTexts.password.noSmallLetters[language]);
  }
  if (!noNumbersRegex.test(password)) {
    errors.push(UIErrorTexts.password.noNumbers[language]);
  }
  if (!noSpecialCharactersRegex.test(password)) {
    errors.push(UIErrorTexts.password.noSpecialCharacters[language]);
  }

  if (errors.length > 0) {
    return { valid: false, messages: errors };
  }

  return {
    valid: true,
    message: UIErrorTexts.authentication.loginSuccess[language],
  };
}

export function validateRegister(
  email: string,
  username: string,
  password: string,
  confirmPassword: string,
  dateOfBirth: string,
  language: 'HU' | 'EN' = 'EN'
) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  const noCapitalLettersRegex = /^(?=.*[A-Z])/;
  const noSmallLettersRegex = /^(?=.*[a-z])/;
  const noNumbersRegex = /^(?=.*\d)/;
  const noSpecialCharactersRegex = /^(?=.*\W)/;

  const errors: string[] = [];

  if (!emailRegex.test(email)) {
    errors.push(UIErrorTexts.email.invalidEmail[language]);
  }

  if (!usernameRegex.test(username)) {
    errors.push(UIErrorTexts.username.invalidUsername[language]);
  }

  if (password.length < 8) {
    errors.push(UIErrorTexts.password.minCharacters[language]);
  }
  if (!noCapitalLettersRegex.test(password)) {
    errors.push(UIErrorTexts.password.noCapitalLetters[language]);
  }
  if (!noSmallLettersRegex.test(password)) {
    errors.push(UIErrorTexts.password.noSmallLetters[language]);
  }
  if (!noNumbersRegex.test(password)) {
    errors.push(UIErrorTexts.password.noNumbers[language]);
  }
  if (!noSpecialCharactersRegex.test(password)) {
    errors.push(UIErrorTexts.password.noSpecialCharacters[language]);
  }

  if (password !== confirmPassword) {
    errors.push(UIErrorTexts.password.passwordsDoNotMatch[language]);
  }
  if (Number(dateOfBirth.split('-')[0]) > 2009) {
    errors.push(UIErrorTexts.dateOfBirth.ageRestriction[language]);
  }

  if (Number(dateOfBirth.split('-')[0]) < 1930) {
    errors.push(UIErrorTexts.dateOfBirth.invalidDoB[language]);
  }

  errors.map((error) => console.error(error));
  if (errors.length > 0) {
    return { valid: false, messages: errors };
  }

  return {
    valid: true,
    message: UIErrorTexts.authentication.registrationSuccess[language],
  };
}
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
