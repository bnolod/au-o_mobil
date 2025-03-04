import { User } from "@/lib/entity/User";

export interface GroupMessageProps {
    user: User
    sender: User
    message: string
    date: string
}
export interface DirectMessageItemProps {
    user: User
    contact: User
    lastMessage: string
    date: string
}