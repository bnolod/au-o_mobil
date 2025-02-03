import { PostResponse, Reactions, ReactionState } from "@/constants/types";
import { EventEmitter } from "events"
import { SetStateAction, useCallback } from "react"
import { apiFetch } from "./apiClient";
export const eventEmitter = new EventEmitter()

export function handleShowMore(lines: number | undefined): number | undefined {
    return(lines === 3 ? undefined : 3);
}
export function getReactionEndpoint(reaction: "fire" | "heart" | "sunglasses") {
  switch(reaction) {
    case "fire": return "FIRE"
    case "heart": return "HEART"
    case "sunglasses": return "COOL"
  }
}
export const handleReaction = (reactions: Reactions, reactionState: ReactionState, type: "fire" | "heart" | "sunglasses") => {

    const newReactions = { ...reactionState };
    newReactions[type] =
      newReactions[type] === reactions[type]
        ? reactions[type] + 1
        : reactions[type];
    return newReactions;
  };