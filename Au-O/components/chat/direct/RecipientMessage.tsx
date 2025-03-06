import { View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { MessageProps } from '../props';
import Avatar from '@/components/ui/Avatar';

export default function RecipientMessage({ profilePic, id, nickname, message, isLast, isFirst }: MessageProps) {
  return (
    <View className="flex flex-row  items-end gap-2 pl-2">
      <View className='w-14 p-2'/>
      {isFirst && <Avatar className="absolute left-1 bottom-1 w-10 h-10 secondary" image={profilePic ? { uri: profilePic } : null} nickname={nickname} />}
      <View className={`bg-highlight-light dark:bg-highlight-dark p-2 max-w-[58%]
        
           ${isLast ? 'rounded-t-xl' : ''}
           ${isFirst ? (isLast ? 'my-1' : 'mt-1') : 'mt-1'}
           ${isFirst ? 'rounded-br-xl' : ''}`}>
        <ThemedText className="text-lg leading-tight">
{message}
        </ThemedText>
      </View>
    </View>
  );
}
