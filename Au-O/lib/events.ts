import { PostResponse, Reactions, ReactionState } from "@/constants/types";
import { EventEmitter } from "events";
import * as Haptics from 'expo-haptics'
export const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(1);

export function handleShowMore(lines: number | undefined, maxLines: number):  number | undefined {
  return lines === maxLines ? undefined : maxLines;
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

export function handleTabSelection(tab: "POST" | "GROUPS" | "SAVED") {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  return tab;
}