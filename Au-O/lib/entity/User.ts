export interface User extends UserResponse {

  password: string;
  role: string;
  email: string;
  dateOfBirth: string;
}
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