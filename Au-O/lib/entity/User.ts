export interface User {
  id: number;
  username: string;
  nickname: string;
  isPublic: boolean;
  profileImg: string;
  bio: string;
  dateOfSignup: string;

  password: string;
  role: string;
  email: string;
  dateOfBirth: string;
}
