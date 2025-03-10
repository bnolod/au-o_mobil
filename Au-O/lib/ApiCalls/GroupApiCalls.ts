import { apiFetch } from '../apiClient';
import { GroupCreationRequest } from '../request/GroupCreationRequest';
import { Group, GroupMemberListResponse, GroupMemberResponse } from '../entity/Group';
import { ImageStoreRequest, ImageUploadResponse } from '../request/ImgurRequest';
import { cleanupInvalidImageUploads, createImageForm } from '../functions';
import { imageUpload } from './ImageApiCalls';
import { PostCreationTexts } from '@/constants/texts';
import Toast from 'react-native-toast-message';
import { ImagePickerAsset } from 'expo-image-picker';
import { User } from '../entity/User';
import { router } from 'expo-router';
import { CreatePostRequest } from '../request/PostCreationRequest';
import { Post } from '../entity/Post';

export async function createGroup(request: GroupCreationRequest) {
  const req = await apiFetch<Group>('groups/group', 'POST', true, request);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
export async function getGroup(groupId: string) {
  const req = await apiFetch<Group>('groups/group/' + groupId, 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
export async function getAllGroups() {
  //temporary
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

export async function postToGroup(groupId: number, post: ImageStoreRequest) {
  const req = await apiFetch<Post>(`groups/group/${groupId}/post`, 'POST', true, post);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
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