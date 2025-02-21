import { EventPostData, GroupPostData, Reactions } from "@/constants/types";
import { Car } from "@/lib/entity/Car";
import { Image } from "@/lib/entity/Image";
import { User } from "@/lib/entity/User";
import { Comment } from "@/lib/entity/Comment";



export interface PostCardProps {
            postId: number | null;
            reaction: null | "FIRE" | "HEART" | "COOL";
            preview?: boolean;
            user: User;
            authorId: number | null;
            groupData?: GroupPostData;
            authorProfileImg: string;
            eventData?: EventPostData;
            authorNickname: string;
            authorUsername: string;
            date: string;
            images: Image[];
            description: string;
            location: string;
            reactions: Reactions;
            vehicle: Car | null;
            comments: Comment[];
            language: "EN" | "HU";
            colorScheme: "light" | "dark";
          }