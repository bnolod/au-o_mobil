import { PostType, PostUser, Reactions } from "@/constants/types";
import { Image } from "./Image";
import { Car } from "./Car";

export interface Post {
  dateOfCreation: string;
  dateOfUpdate: string;
  group: any;
  images: Image[];
  location: string;
  postId: number;
  postType: PostType;
  reactionTypeMap: Reactions;
  text: string;
  user: PostUser;
  comments: Comment[];
  reactedWith: null | "FIRE" | "HEART" | "COOL";
  vehicle: Car | null
}