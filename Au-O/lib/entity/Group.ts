import { User, UserResponse } from "./User";
/**
 * @param id Csoport azonosítója
 * @param name Csoport neve
 * @param description Csoport leírása
 * @param bannerImage Csoport kép URL
 * @param alias Csoport rövidített neve
 * @param public Csoport láthatósága
 * @param creationDate Csoport létrehozási ideje
 * @param member Tagság
 * @param validMember Tagság státusza
 */
export interface Group {
  id: number;
  name: string;
  alias: string;
  bannerImage: string;
  memberCount: number;
  public: boolean;
  creationDate: string;
  member: boolean;
  description: string;
  validMember : boolean;
}
/**
 * @deprecated
 */
export interface GroupPost {
  groupName: string;
  groupNickname: string;
  groupIcon: string | null;
}
/**
 * @param user Felhasználó entitás
 * @param role Felhasználó jogosultságai
 * @param joinedDate Felhasználó jelentkezéési dátuma
 * @param valid Felhasználó jelentkezéési státusza
 */
export interface GroupMemberResponse {
  user: UserResponse;
  role: string;
  joinedDate: string;
  valid: boolean
}
/**
 * @param group Csoport entitás
 * @param users Csoport tag lista
 */
export interface GroupMemberListResponse {
  group: Group
  users: GroupMemberResponse[]
}