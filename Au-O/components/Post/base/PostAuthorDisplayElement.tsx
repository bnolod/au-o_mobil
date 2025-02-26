import { View } from 'react-native';
import ThemedText from '../../ui/ThemedText';
import { PostDispayElementProps } from './props';

export default function PostAuthorDisplayElement({
  authorNickname,
  authorUsername,
  group,
  event,
  postType,
}: PostDispayElementProps) {
  return (
    <View className={`flex  ${postType !== 'USER' ? 'post-author-display-true' : ' post-author-display-false'}`}>
      <ThemedText className="txl">
        {postType === 'USER' && authorNickname}
        {postType === 'GROUP' && (
          <View className='flex items-center flex-row'>
            <ThemedText className='font-bold text-lg'>{group?.name} </ThemedText>
            <ThemedText className="tsm font-normal muted ">
              {group?.alias}
            </ThemedText>
          </View>
        )}
        {postType === 'EVENT' && event?.name}
        {postType === 'INVALID' && 'Invalid'}
      </ThemedText>
      <ThemedText className={`tsm flex-wrap flex muted `}>{postType === 'USER' && '@' + authorUsername}</ThemedText>
    </View>
  );
}
