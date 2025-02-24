import { GroupPost } from "../entity/Group";
import { EventPost } from "../entity/SocialEvent";

export interface PostEditRequest {
    description: string;
    groupData: GroupPost | null;
    eventData: EventPost | null;
    location: string;
    vehicleId: number | null;
  }