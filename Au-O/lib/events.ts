import { EventEmitter } from 'events';
import * as Haptics from 'expo-haptics';
import { Group } from './entity/Group';
import { Alert, Platform } from 'react-native';
import { GroupTexts, SocialTexts, ToastMessages } from '@/constants/texts';
import { deleteGroup, leaveGroup } from './ApiCalls/GroupApiCalls';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { Reactions } from '@/constants/types';
export const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(1);
/**
 * Sortörést kezelő funkció
 * @param {number | undefined} lines aktuális sorok száma
 * @param {number} maxLines maximum kiírt sorok száma
 * @returns {number | undefined} kezelt sorszám
 */
export function handleShowMore(lines: number | undefined, maxLines: number): number | undefined {
  return lines === maxLines ? undefined : maxLines;
}
/**
 * Reakció végpontjának lekérése
 * @param {Reactions} reaction reakció típusa
 * @returns {keyof Reaction} reakció típusa
 */
export function getReactionEndpoint(reaction: 'fire' | 'heart' | 'sunglasses') {
  switch (reaction) {
    case 'fire':
      return 'FIRE';
    case 'heart':
      return 'HEART';
    case 'sunglasses':
      return 'COOL';
  }
}
/**
 * Profil fül váltás kezelése
 * @param {'POST' | 'GROUPS' | 'SAVED' | 'GARAGE'} tab aktuális fül
 * @returns kiválasztott fül
 */
export function handleTabSelection(tab: 'POST' | 'GROUPS' | 'SAVED' | 'GARAGE') {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  return tab;
}
/**
 * Csoport elhagyásának kezelése
 * @async
 * @param {Group} group Csoport entitás
 * @param {"HU" | "EN"} language Nyelv
 */
export async function handleLeave(group: Group, language: 'EN' | 'HU') {
  if (group.validMember) {
    Alert.alert(SocialTexts.group.leave.header[language], SocialTexts.group.leave.body[language], [
      {
        text: SocialTexts.group.leave.confirmLeave[language],
        onPress: () => {
          confirmLeave(language, group);
        },
      },
      {
        text: GroupTexts.buttons.cancel[language],
        onPress: () => {
          return;
        },
        style: 'cancel',
      },
    ]);
  }
}

/**
 * Csoport jelentkezési kérés visszavonásának kezelése
 * @async
 * @param {group} group Csoport entitás
 * @param {"HU" | "EN"} language Nyelv
 * @returns {Promise<void>}
 */
export async function revokeJoinRequest(group: Group, language: 'EN' | 'HU') {
  if (group.member) {
    Alert.alert(GroupTexts.options.revokeJoinRequest[language], GroupTexts.options.confirmRevoke[language], [
      {
        text: SocialTexts.group.leave.confirmLeave[language],
        onPress: () => {
          confirmLeave(language, group);
        },
      },
      {
        text: GroupTexts.buttons.cancel[language],
        onPress: () => {
          return;
        },
        style: 'cancel',
      },
    ]);
  }
}
/**
 * Csoport elhagyásának megerősítése
 * @param {Group} group Csoport entitás
 * @param {"EN" | "HU"} language Nyelv 
 * @async
 * @returns {Promise<void>}
 */

async function confirmLeave(language: 'EN' | 'HU', group: Group) {
  const res = await leaveGroup(group.id);
  if (res === 409) {
    Toast.show({
      type: 'error',
      text1: ToastMessages.headers.error[language],
      text2: ToastMessages.error.group.leave[language],
    });
    return;
  }
  if (res === 200) {
    router.canGoBack() ? router.back() : router.replace({ pathname: '/(root)/(groups)/feed' });
    Toast.show({
      type: 'success',
      text1: ToastMessages.headers.success[language],
      text2: ToastMessages.success.group.leave[language],
    });
    return;
  }
  Toast.show({
    type: 'error',
    text1: ToastMessages.headers.error[language],
    text2: ToastMessages.error.group.leaveReq[language],
  });
}
/**
 * Csoport törlésének kezelése
 * @param {Group} group Csoport entitás
 * @param {"EN" | "HU"} language Nyelv
 * @async
 * @returns {Promise<void>}
 */

export async function handleDeleteRequest(group: Group, language: 'EN' | 'HU') {
  Alert.alert(GroupTexts.options.delete[language], GroupTexts.options.confirmDeleteGroup[language], [
    {
      text: GroupTexts.options.delete[language],
      onPress: () => {
        deleteGroup(group.id);
        router.replace({ pathname: '/(root)/(groups)/feed' });
      },
    },
    {
      text: GroupTexts.buttons.cancel[language],
      onPress: () => {
        return;
      },
      style: 'cancel',
    },
  ]);
}
