/**
 * @extends UserResponse
 * @param password Jelszó
 * @param email E-mail
 * @param role Jogosultságok
 * @param dateOfBirth Születési dátum
 */
export interface User extends UserResponse {

  password: string;
  role: string;
  email: string;
  dateOfBirth: string;
}
/**
 * @param id Azonosító
 * @param username Felhasználónév
 * @param nickname Becenév
 * @param isPublic Láthatóság
 * @param profileImg Profilkép URL
 * @param bio Leírás
 * @param dateOfSignup Regisztráció dátuma
 * @param delted Megjelölve törlésre
 */
export interface UserResponse {
  id: number;
  username: string;
  nickname: string;
  isPublic: boolean;
  profileImg: string;
  bio: string;
  dateOfSignup: string;
  deleted: false
}