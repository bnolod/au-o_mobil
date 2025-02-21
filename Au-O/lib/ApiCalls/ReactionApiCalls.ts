import { apiFetch } from "../apiClient"

export async function addReaction(
            target: "post" | "comment" | "reply",
            postId: number,
            reaction: null | "FIRE" | "HEART" | "COOL"
          ) {    
            if (!reaction) {
            }
            const res = await apiFetch(
              `posts/${target}/${postId}/addOrRemoveReaction/${reaction}`,
                        "POST",)

            return res?.status === 200
          }