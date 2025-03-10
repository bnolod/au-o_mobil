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
        {postType === 'GROUP' && group && (
          <View>
          <View className='flex items-center flex-row gap-2'>
            <ThemedText className='font-bold text-lg'>{group.name || group.groupName}</ThemedText>
            <ThemedText className="tsm font-normal muted">
              {group?.alias || group.groupAlias}
            </ThemedText>
          </View>
          <ThemedText className="tsm font-normal muted ">
            {authorNickname}
          </ThemedText>
          </View>
        )}
        {postType === 'EVENT' && event?.name}
        {postType === 'INVALID' && 'Invalid'}
      </ThemedText>
      {/* <ThemedText className={`tsm flex-wrap flex muted `}>{postType === 'USER' && '@' + authorUsername}</ThemedText> */}
    </View>
  );
}
