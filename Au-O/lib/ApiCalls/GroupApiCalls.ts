/**
 * Csoportokhoz kapcsolódó API hívások
 * @module ApiCalls/GroupApiCalls
 * @category API
 */

import { apiFetch } from '../apiClient';
import { GroupCreationRequest } from '../request/GroupCreationRequest';
import { Group, GroupMemberListResponse, GroupMemberResponse, Status } from '../entity/Group';
import { ImageStoreRequest } from '../request/ImgurRequest';
import { Post } from '../entity/Post';
import { GroupEditRequest } from '../request/GroupEditRequest';
import { Alert } from 'react-native';
import { GroupTexts, SocialTexts, ToastMessages } from '@/constants/texts';
import { showErrorToast, showSuccessToast } from '../functions';
import { router } from 'expo-router';
import { GroupMessageType } from '../entity/GroupMessage';

/**
 * Csoport létrehozása
 * 
 * @param {GroupCreationRequest} request A csoport létrehozásához szükséges adatok
 * @returns {Promise<Group | null>} A létrehozott csoport, vagy null
 * @see Group
 */
export async function createGroup(request: GroupCreationRequest) {
  const req = await apiFetch<Group>('groups/group', 'POST', true, request);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}

/**
 * Csoport jelentkezési kérés visszavonásának kezelése
 * 
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
 * 
 * @returns {Promise<void>}
 */
/**
 * Csoport elhagyásának kezelése
 * 
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
async function confirmLeave(language: 'EN' | 'HU', group: Group) {
  const res = await leaveGroup(group.id);
  if (res === 409) {
    showErrorToast(

      ToastMessages.headers.error[language],
      ToastMessages.error.group.leave[language],
    )

    return;
  }
  if (res === 200) {
    router.canGoBack() ? router.back() : router.replace({ pathname: '/(root)/(groups)/feed' });
    showSuccessToast(

       ToastMessages.headers.success[language],
       ToastMessages.success.group.leave[language],
    )     
    return;
  }
  showErrorToast(
     ToastMessages.headers.error[language],
     ToastMessages.error.group.leaveReq[language],
  );
}
/**
 * Csoport törlésének kezelése
 * @param {Group} group Csoport entitás
 * @param {"EN" | "HU"} language Nyelv
 * 
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
/**
 * Csoport lekérdezése
 * 
 * @param {number} groupId A csoport azonosítója
 * @returns {Promise<Group | null>} A csoport, vagy null
 * @see Group
 */
export async function getGroup(groupId: number) {
  const req = await apiFetch<Group>('groups/group/' + groupId, 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Összes csoport lekérdezése
 * 
 * @returns {Promise<Group[] | null>} Az összes csoport, vagy null
 * @see Group
 * @deprecated
 * 
 *  Feedre cserélni
 */
export async function getAllGroups() {
  const req = await apiFetch<Group[]>('groups/all', 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Saját csoportok lekérdezése
 * @returns {Promise<Group[] | null>} Az összes csoport, vagy null
 */
export async function getOwnGroups() {
  const req = await apiFetch<Group[]>('groups/own', 'GET', true);
  if (req && req.status === 200) return req.data;
  else return null;
}
/**
 * Csoport jelentkezés vagy elutasítás
 * @param groupId Csoport ID
 * @param userId Felhasználó ID
 * @param accept Elfogadás vagy elutasítás
 * @returns {Promise<Group | null>} A csoport, vagy null
 */
export async function handleJoinRequest(groupId: number, userId: number, accept: boolean) {
  const req = await apiFetch('groups/handleJoinRequest/' + groupId + '/' + userId + '/' + accept, 'POST', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Csoport jelentkezés visszavonása
 * @returns {Promise<Group | null>} A csoport, vagy null
 */
export async function revokeRequest() {
  const req = await apiFetch('groups/revokeRequest', 'POST', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Csoport poszt létrehozás
 * @param groupId Csoport ID
 * @param post Csoport poszt
 * @returns {Promise<Post | null>} A létrehozott poszt, vagy null
 * @see Post
 */
export async function postToGroup(groupId: number, post: ImageStoreRequest) {
  const req = await apiFetch<Post>(`groups/group/${groupId}/post`, 'POST', true, post);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Csoport törlése
 * @param groupId Csoport ID
 * @returns {Promise<boolean>} Csoport törlésének sikeressége
 */
export async function deleteGroup(groupId: number) {
  const req = await apiFetch('groups/group/' + groupId, 'DELETE', true);
  if (req && req.status === 200) {
    return true;
  }
  return false;
}
/**
 * Jelentkezés csoportba
 * @param groupId Csoport ID
 * @returns {Promise<Group | null>} A csoport, vagy null
 * @see Group
 */
export async function joinGroup(groupId: number) {
  const req = await apiFetch('groups/group/' + groupId + '/join', 'POST', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Csoport elhagyása
 * @param groupId Csoport ID
 * @returns {Promise<number>} HTTP státusz kód
 */
export async function leaveGroup(groupId: number) {
  const req = await apiFetch('groups/group/' + groupId + '/leave', 'POST', true);
  return req!.status;
}
/**
 * Csoport tagjainak lekérdezése
 * @param groupId Csoport ID
 * @returns {Promise<GroupMemberListResponse | null>} Csoport tagjai, vagy null
 * @see GroupMemberListResponse
 */
export async function getGroupMembers(groupId: number) {
  const req = await apiFetch<GroupMemberListResponse>(`groups/group/${groupId}/members`, 'GET', true);
  if (req) return req

}
/**
 * Csoport státuszának lekérdezése
 * @param groupId Csoport ID
 * @returns {Promise<GroupMemberResponse | null>} Csoport státusza, vagy null
 * @see GroupMemberResponse
 */
export async function getGroupStatus(groupId: number) {
  const req = await apiFetch<GroupMemberResponse>('groups/group/' + groupId + '/status', 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Csoport módosítása
 * @param groupId Csoport ID
 * @param request Csoport módosítási kérés
 * @returns {Promise<boolean>} Módosítás sikeressége
 * @see GroupEditRequest
 */
export async function modifyGroup(groupId: number, request: GroupEditRequest) {
  const req = await apiFetch<Group>(`groups/group/${groupId}`, "PUT", true, request )
  return req!.status === 200
}
/**
 * Csoport posztok lekérdezése
 * @param id Csoport ID
 * @returns {Promise<Post[] | null>} Csoport posztok, vagy null
 * @see Post
 */
export async function getGroupPosts(id: number) {
  const req = await apiFetch<Post[]>(`groups/group/${id}/posts`, 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;

}
/**
 * Felhasználó csoportjainak lekérdezése
 * @param id Csoport ID
 * @returns {Promise<Group[] | null>} Csoportok, vagy null
 */
export async function getGroupsOfUser(id: number) {
  const req = await apiFetch<Group[]>(`groups/user/${id}`, 'GET', true);
  if (req && req.status === 200) {
    console.log("data:"+req.data)
    return req.data;
  }
  console.log("data nincs")
  return null;

}
/**
 * Csoporthoz tartozó függőben lévő tagok lekérdezése
 * @param id Csoport azonosító
 * @param role Csoport role
 * @returns {Promise<GroupMemberResponse[] | null>} Visszatér a csoport tagjaival, vagy null
 * @see GroupMemberResponse
 */
export async function getPendingMembers(id: number, role: Status) {
  if (role === "MEMBER") return null;
  const req = await apiFetch<GroupMemberResponse[]>(`groups/group/${id}/pending`, 'GET', true);

  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Felhasználó jelentkezésének visszautasítása
 * @param groupId Csoport azonosító
 * @param userId Felhhasználó azonosító
 * @returns {Promise<boolean>} Visszautasítás sikeressége
 * @see Group
 */
export async function rejectApplication(groupId: number, userId: number) {
  const req = await apiFetch(`groups/handleJoinRequest/${groupId}/${userId}/false`, 'POST', true);
  return req!.status === 200;
}
/**
 * Felhasználó jelentkezésének elfogadása
 * @param groupId Csoport azonosító
 * @param userId Felhhasználó azonosító
 * @returns {Promise<boolean>} Elfogadás sikeressége
 * @see Group
 */
export async function acceptApplication(groupId: number, userId: number) {
  const req = await apiFetch(`groups/group/handleJoinRequest/${groupId}/${userId}/true`, 'POST', true);
  return req!.status === 200;
}
/**
 * Felhasználó szerepkörének előléptetése
 * @param groupId Csoport azonosító
 * @param userId Felhhasználó azonosító
 * @param role Új szerepkör
 * @returns {Promise<boolean>} Promóció sikeressége
 * @see Group
 */
export async function promoteTo(groupId: number, userId: number, role: Status) {
  const req = await apiFetch(`groups/${groupId}/${userId}`, "PUT", true, {role})
  return req!.status === 200
}
/**
 * Felhasználó eltávolítása a csoportból
 * @param groupId Csoport azonosító
 * @param userId Felhhasználó azonosító
 * @returns {Promise<boolean>} Eltávolítás sikeressége
 * @see Group
 */
export async function kickUser(groupId: number, userId: number) {
  const req = await apiFetch(`groups/${groupId}/${userId}`, "DELETE", true)
  return req!.status === 200
}
/**
 * Csoport üzenetek lekérdezése
 * @param groupId Csoport azonosító
 * @returns {Promise<GroupMessageType[] | null>} Csoport üzenetek, vagy null
 * @see GroupMessageType
 */
export async function getGroupMessages(groupId: number) {
  const res = await apiFetch<GroupMessageType[]>(`/groups/group/${groupId}/messages`, "GET", true)
  console.log(res)
  if (res && res.data) {
    return res.data
  }
  return null
}