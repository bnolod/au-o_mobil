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
  reactions: Reactions,
  reactionState: Reactions,
  type: "FIRE" | "HEART" | "COOL"
) => {
  const newReactions = { ...reactionState };
  newReactions[type] =
    newReactions[type] === reactions[type]
      ? reactions[type] + 1
      : reactions[type];
  return newReactions;
};

export function handleTabSelection(tab: "POST" | "GROUPS" | "SAVED") {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  return tab;
}