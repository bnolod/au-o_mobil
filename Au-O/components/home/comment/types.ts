import {Comment} from '@/lib/entity/Comment';

export interface AddCommentRowProps {
    authorNickname: string;
    focus: boolean;
    postId: number;
    onPostComment: (res: Comment) => void;
  }
  export interface CommentSheetProps {
    comments: Comment[];
    authorNickname: string;
    preview?: boolean;
    userNickname: string;
    postId: number;
    userProfileImg: string;
    authorId: number;
    userId: number;
  }