/**
 * @deprecated
 */
import AlertModal from './AlertModal';

export default function ProfileModal({
  visible,
  onDismiss,
  type,
  isOwner
}: {
  visible: boolean;
  isOwner: boolean;
  onDismiss: () => void;
  type: 'following' | 'follower';
}) {
  return (
    <AlertModal
      buttons={[
        {
          onPress: () => {
            onDismiss();
          }, //VISIT
          text: 'Visit',
          className: 'button secondary btn-fill',
          textClassName: 'tlg',
        },
        type !== 'follower'
          ? {
              onPress: () => {
                onDismiss();
              }, //UNFOLLOW
              text: 'Unfollow',
              className: 'button secondary btn-fill',
              textClassName: 'tlg',
            }
          : isOwner ? {
              onPress: () => {
                onDismiss();
              }, //REMOVE FOLLOW
              text: 'Remove Follow',
              className: 'button secondary btn-fill',
              textClassName: 'tlg',
            } : undefined,
        {
          onPress: () => {
            onDismiss();
          }, //CANCEL
          text: 'Cancel',
          className: 'button border border-highlight secondary btn-fill',
          textClassName: 'tlg',
        },
      ]}
      onDismiss={onDismiss}
      title={type === 'following' ? 'Following' : 'Followers'}
      text=""
      visible={visible}
    />
  );
}
