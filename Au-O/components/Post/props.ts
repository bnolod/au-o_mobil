


export interface PostCardProps {
            postId: number | null;
            reaction: null | "FIRE" | "HEART" | "COOL";
            preview?: boolean;
            user: UserResponse;
            authorId: number | null;
            groupData?: GroupPostData;
            authorProfileImg: string;
            eventData?: EventPostData;
            authorNickname: string;
            authorUsername: string;
            date: string;
            images: ImageUploadResponse[];
            description: string;
            location: string;
            reactions: Reactions;
            vehicle: Car | null;
            comments: Comment[];
            language: "EN" | "HU";
            colorScheme: "light" | "dark";
          }