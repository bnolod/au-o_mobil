import { apiFetch } from "../apiClient";

export async function AddCommentToPost(
    postId: string,
    comment: string
): Promise<Comment | null> {
    if (comment.length === 0) {
        return null;
    }
    const res = await apiFetch<Comment>(
        `posts/post/${postId}/comment`,
        "POST",
        true,
        {
            text: comment,
        }
    );
    if (res) return res.data;
    return null;
}
export async function DeleteComment(commentId: string): Promise<boolean> {
//     const res = await fetch(
//         `${apiClient.defaults.baseURL}/posts/post/comment/${commentId}`,
//         {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${await SecureStore.getItemAsync(
//                     "jwtToken"
//                 )}`,
//             },
//         }
//     );
            const res = await apiFetch(`/posts/post/comment/${commentId}`, "DELETE", true);
            if (res?.status === 200) return true;
            else return false;
}
