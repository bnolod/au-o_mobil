import { User } from "@/lib/entity/User";

export interface MediaMessageProps {
    sender: boolean
    avatar: {
        nickname: string
        profileImg: string | null
    } | null
    colorScheme: "dark" | "light";
}
export interface PostMessageProps extends MediaMessageProps {
    postId: number;
}
export interface GroupInviteProps extends MediaMessageProps {
    groupId: number;
}