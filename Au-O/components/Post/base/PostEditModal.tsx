import AlertModal from '@/components/ui/AlertModal';
import { PostCreationTexts } from '@/constants/texts';
import { handleDelete, handleEdit, handleReport, handleShare } from '@/lib/events/PostOptionEvents';
import { Platform } from 'react-native';

export default function PostOptionModal({
  menuVisible,
  language,
  setMenuVisible,
  postId,
  authorId,
  userId,
}: {
  menuVisible: boolean;
  setMenuVisible: (visible: boolean) => void;
  language: 'EN' | 'HU';
    postId: number | null;
    authorId: number | null;
    userId: number | null;
}) {
    const isOwner =  authorId && userId && postId && authorId === userId;
  if (Platform.OS === 'android')
    return (
      <AlertModal
        onDismiss={() => setMenuVisible(false)}
        visible={menuVisible}
        buttons={[
          {
            onPress: () => { //SHARE
              setMenuVisible(false);
              handleShare(postId!, language);
            },
            text: PostCreationTexts.options.share[language],
            className: 'button btn-fill secondary',
            textClassName: 'tlg',
          },
          {
            onPress: () => {    //REPORT
              setMenuVisible(false);
              handleReport()
            },
            text: PostCreationTexts.options.report[language],
            className: 'button btn-fill secondary',
            textClassName: 'tlg',
          },

          {
            onPress: () => { //CANCEL
              setMenuVisible(false);
            },
            text: PostCreationTexts.options.cancel[language],
            className: 'button btn-fill secondary border-highlight border',
            textClassName: 'tlg',
          },
          isOwner ? {
            onPress: () => { //EDIT
              setMenuVisible(false);
              handleEdit(authorId, userId, postId!);
            },
            text: PostCreationTexts.options.edit[language],
            className: 'button btn-fill secondary',
            textClassName: 'tlg',
        } : undefined,
            isOwner ? {
                onPress: () => { //DELETE
                setMenuVisible(false);
                handleDelete(authorId, userId, language, postId!);
                },
                text: PostCreationTexts.deletePost[language],
                className: 'button btn-fill secondary',
                textClassName: 'tlg',
            } : undefined
        
        ]}
        text="Poszt"
        title="Poszt"
      />
    );
}
