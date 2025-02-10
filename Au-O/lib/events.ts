import { PostResponse, Reactions, ReactionState } from "@/constants/types";
import { EventEmitter } from "events";
import * as Haptics from 'expo-haptics'
export const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(1);

export function handleShowMore(lines: number | undefined): number | undefined {
  return lines === 3 ? undefined : 3;
}
export function getReactionEndpoint(reaction: "fire" | "heart" | "sunglasses") {
  switch (reaction) {
    case "fire":
      return "FIRE";
    case "heart":
      return "HEART";
    case "sunglasses":
      return "COOL";
  }
}
export const handleReaction = (
  type:  "FIRE" | "HEART" | "COOL",
  reactions: Reactions,
  resetCurrentReaction: () => void,
  initialReaction: null | "FIRE" | "HEART" | "COOL"
) => {if (initialReaction === type) {
    resetCurrentReaction()
    return {
      ...reactions,
      [type]: reactions[type] - 1,
    };
  } else {
    return {
      ...reactions,
      [type]: reactions[type] + 1,
    }
  }

};

export function handleTabSelection(tab: "POST" | "GROUPS" | "SAVED") {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  return tab;
}