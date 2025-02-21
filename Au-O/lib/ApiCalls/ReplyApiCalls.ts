import { apiFetch } from "../apiClient";
import { Reply } from "../entity/Reply";

export async function sendReply(
    commentId: string,
    text: string
): Promise<Reply | null> {
    if (text.length === 0) return null;
    const res = await apiFetch<Reply>(
        `posts/post/comment/${commentId}/reply`,
        "POST",
        true,
        {
            text,
        }
    );
    if (res) return res.data;
    return null;
}
