/**
 * Csoportokhoz kapcsolódó API hívások
 * @module ApiCalls/GroupApiCalls
 * @category API
 */

import { apiFetch } from '../apiClient';
import { GroupCreationRequest } from '../request/GroupCreationRequest';
import { Group, GroupMemberListResponse, GroupMemberResponse } from '../entity/Group';
import { ImageStoreRequest } from '../request/ImgurRequest';
import { Post } from '../entity/Post';
import { GroupEditRequest } from '../request/GroupEditRequest';

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

export async function getOwnGroups() {
  const req = await apiFetch<Group[]>('groups/own', 'GET', true);
  if (req && req.status === 200) return req.data;
  else return null;
}

export async function handleJoinRequest(groupId: number, userId: number, accept: boolean) {
  const req = await apiFetch('groups/handleJoinRequest/' + groupId + '/' + userId + '/' + accept, 'POST', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
export async function revokeRequest() {
  const req = await apiFetch('groups/revokeRequest', 'POST', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
export async function postToGroup(groupId: number, post: ImageStoreRequest) {
  const req = await apiFetch<Post>(`groups/group/${groupId}/post`, 'POST', true, post);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
export async function deleteGroup(groupId: number) {
  const req = await apiFetch('groups/group/' + groupId, 'DELETE', true);
  if (req && req.status === 200) {
    return true;
  }
  return false;
}
export async function joinGroup(groupId: number) {
  const req = await apiFetch('groups/group/' + groupId + '/join', 'POST', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
export async function leaveGroup(groupId: number) {
  const req = await apiFetch('groups/group/' + groupId + '/leave', 'POST', true);
  return req!.status;
}
export async function getGroupMembers(groupId: number) {
  const req = await apiFetch<GroupMemberListResponse>(`groups/group/${groupId}/members`, 'GET', true);
  if (req) return req

}
export async function getGroupStatus(groupId: number) {
  const req = await apiFetch<GroupMemberResponse>('groups/group/' + groupId + '/status', 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
export async function modifyGroup(groupId: number, request: GroupEditRequest) {
  const req = await apiFetch<Group>(`groups/group/${groupId}`, "PUT", true, request )
  return req!.status === 200
}
export async function getGroupPosts(id: number) {
  const req = await apiFetch<Post[]>(`groups/group/${id}/posts`, 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;

}

export async function getGroupsOfUser(id: number) {
  const req = await apiFetch<Group[]>(`groups/user/${id}`, 'GET', true);
  if (req && req.status === 200) {
    console.log("data:"+req.data)
    return req.data;
  }
  console.log("data nincs")
  return null;

}