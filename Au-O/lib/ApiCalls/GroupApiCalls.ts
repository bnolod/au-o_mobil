import { apiFetch } from "../apiClient";
import { GroupCreationRequest } from "../request/GroupCreationRequest";
import { Group } from "../entity/Group";


export async function createGroup(request: GroupCreationRequest) {
    const req = await apiFetch<Group>("groups/group", "POST", true, request);
    if (req && req.status === 200) {
      return req.data;
    }
    return null
  }
  export async function getGroup(groupId: string) {
    const req = await apiFetch<Group>("groups/group/" + groupId, "GET", true);
    if (req && req.status === 200) {
      return req.data;
    }
    return null;
  }
  export async function getAllGroups() { //temporary
    const req = await apiFetch<Group[]>("groups/all", "GET", true);
    if (req && req.status === 200) {
      return req.data;
    }
    return null;
  }