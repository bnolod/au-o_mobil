import { User } from "../entity/User";
import { ChatMessage } from "./ChatMessage";

export default interface LatestMessage extends User {
            active: boolean;
            message: ChatMessage;

}