import { User, UserResponse } from "./User";
/**
 * Csoport entitás
 * @interface
 
 */
export interface Group {
  /**
   * Csoport azonosítója
   * @type {number}
   */
  id: number;
  /**
   * Csoport neve
   * @type {string}
   */
  name: string;
  /**
   * Csoport rövid neve
   * @type {string}
   */
  alias: string;
  /**
   * Csoport kép URL
   * @type {string}
   */
  bannerImage: string;
  /**
   * Csoport tagjainak száma
   * @type {number}
   */
  memberCount: number;
  /**
   * Csoport láthatósága
   * @type {boolean}
  */
  public: boolean;
  /**
   * Csoport létrehozásának dátuma
   * @type {string}
   */
  creationDate: string;
  /**
   * Felhasználó tagság státusza
   * @type {boolean}
   */
  member: boolean;
  /**
   * Csoport leírása
   * @type {string}
   */
  description: string;
  /**
   * Felhasználó tagság státuszának validitása
   * @type {boolean}
   */
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
 * Csoport entitás válasza
 * @interface
 */
export interface GroupMemberResponse {
  /**
   * Felhasználó
   * @type {UserResponse}
   */
  user: UserResponse;
  /**
   * Felhasználó jogosultságai
   * @type {string}
   */
  role: string;
  /**
   * Felhasználó jelentkezési dátuma
   * @type {string}
   */
  joinedDate: string;
  /**
   * Felhasználó jelentkezési státusza
   * @type {boolean}
   */
  valid: boolean
}
/**
 * Csoport tagok listájának válasza
 * @interface
 */
export interface GroupMemberListResponse {
  /**
   * Csoport entitás
   * @type {Group}
   */
  group: Group
  /**
   * Csoport tagok listája
   * @type {GroupMemberResponse[]}
   */
  users: GroupMemberResponse[]
}