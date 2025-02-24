import { apiFetch } from '../apiClient';
import { Comment } from '../entity/Comment';

export async function AddCommentToPost(postId: string, comment: string): Promise<Comment | null> {
  if (comment.length === 0) {
    return null;
  }
  const res = await apiFetch<Comment>(`posts/post/${postId}/comment`, 'POST', true, {
    text: comment,
  });
  if (res) return res.data;
  return null;
}
export async function DeleteComment(commentId: string): Promise<boolean> {
  const res = await apiFetch(`/posts/post/comment/${commentId}`, 'DELETE', true);
  if (res?.status === 200) return true;
  else return false;
}
