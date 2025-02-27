import { apiFetch } from '../apiClient';
import { GroupCreationRequest } from '../request/GroupCreationRequest';
import { Group } from '../entity/Group';
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
  const req = await apiFetch<Post>(`groups/${groupId}/post`, 'POST', true, post);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}

export async function joinGroup(groupId: number) {
  const req = await apiFetch('groups/group' + groupId + '/join', 'POST', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}

async function submitPostToGroup(
  setLoading: (state: boolean) => void,
  images: ImagePickerAsset[],
  setImages: (images: ImagePickerAsset[]) => void,
  newPostForm: any,
  setNewPostForm: (form: any) => void,
  language: 'EN' | 'HU',
  user: User,
  selectedEvent: any,
  groupId: number,
  bottomSheetRef: any
) {
  setLoading(true);
  const uploadedImages: ImageUploadResponse[] = [];
  for (const image of images) {
    const res = await createImageForm(image, newPostForm.description, user!);
    if (res) {
      const upload = await imageUpload(res);
      if (upload) {
        uploadedImages.push(upload);
      }
    }
  }
  setLoading(false);

  if (uploadedImages.length === images.length) {
    const imageStoreRequest: ImageStoreRequest = {
      text: newPostForm.description || '',
      location: newPostForm.location || '',
      postImages: uploadedImages,
      vehicleId: newPostForm.vehicleId,
    };
    const storeRes = await postToGroup(groupId, imageStoreRequest);
    bottomSheetRef.current?.dismiss();
    setNewPostForm({
      description: '',
      location: '',
      userId: user!.id,
      groupId: null,
      eventId: selectedEvent ? selectedEvent.id : null,
      images: [],
      vehicleId: null,
    });
    setLoading(false);
    if (storeRes) {
      Toast.show({
        type: 'success',
        text1: PostCreationTexts.imageUploadSuccessToast.header[language],
        text2: PostCreationTexts.imageUploadSuccessToast.message[language],
      });
      setImages([]);
      router.replace('/(root)/home');
      router.push({
        pathname: '/(post)/page/[id]',
        params: { id: storeRes.postId, isNew: 'true' },
      });
    } else {
      Toast.show({
        type: 'error',
        text1: PostCreationTexts.imageUploadErrorAlert[language],
      });
    }
  } else {
    cleanupInvalidImageUploads(uploadedImages);
    Toast.show({
      type: 'error',
      text1: 'Some images failed to upload (' + uploadedImages.length + '/' + images.length + ')',
    });
    return;
  }
}
