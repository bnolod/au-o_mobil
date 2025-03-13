/**
 * Felhasználó entitások
 * @category Entity
 * @module entity/User
 */

/**
 * Biztosított felhasználó entitás
 * @extends UserResponse
 * @interface
 */
export interface User extends UserResponse {
  /**
   * Jelszó
   * @type {string}
   */
  password: string;
  /**
   * Jogosultságok
   * @type {string}
   */
  role: string;
  /**
   * Email cím
   * @type {string}
   */
  email: string;
  /**
   * Születési dátum
   * @type {string}
   */
  dateOfBirth: string;

}
/**
 * Felhasználó válasza
 * @interface
 */
export interface UserResponse {
  /**
   * Azonosító
   * @type {number}
   */
  id: number;
  /**
   * Felhasználónév
   * @type {string}
   */
  username: string;
  /**
   * Becenév
   * @type {string}
   */
  nickname: string;
  /**
   * Láthatóság
   * @type {boolean}
   */
  isPublic: boolean;
  /**
   * Profilkép URL
   * @type {string}
   */
  profileImg: string;
  /**
   * Leírás
   * @type {string}
   */
  bio: string;
  /**
   * Regisztráció dátuma
   * @type {string}
   */
  dateOfSignup: string;
  /**
   * Megjelölve törlésre
   * @type {boolean}
   */
  deleted: false
}