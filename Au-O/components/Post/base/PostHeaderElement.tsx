import Button from '../../ui/Button';
import Avatar from '../../ui/Avatar';

import PostSocialIcon from './PostSocialIcon';
import { PostDispayElementProps } from './props';

export default function PostHeaderElement({
  onPress,
  authorNickname,
  authorProfileImg,
  colorScheme,
  postType,
  event,
  group,
}: PostDispayElementProps) {
  return (
    <Button variant="transparent" className="m-0 h-12 w-12 mr-2" onPress={onPress} hapticFeedback="light">
      {postType === 'USER' && <Avatar image={authorProfileImg} nickname={authorNickname} />}
      {postType === 'GROUP' && !event && <PostSocialIcon colorScheme={colorScheme!} icon="account-group-outline" />}
      {postType === 'GROUP' && event && <PostSocialIcon colorScheme={colorScheme!} icon="flag-checkered" />}
      {event && postType !== 'GROUP' && <PostSocialIcon colorScheme={colorScheme!} icon="flag-outline" />}
      {postType === 'INVALID' && <PostSocialIcon colorScheme={colorScheme!} icon="message-question" />}
    </Button>
  );
}
