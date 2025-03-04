import Avatar from '@/components/ui/Avatar';
import ThemedText from '@/components/ui/ThemedText';
import { View } from 'react-native';
import { MessageProps } from '../props';

export default function UserMessage({ profilePic, id, nickname, message }: MessageProps) {
  return (
    <>
      <View className="flex flex-row-reverse  items-end gap-2 my-2 pr-2">
        <Avatar className="w-10 h-10 secondary" image={profilePic ? { uri: profilePic } : null} nickname={nickname} />
        <View className="secondary p-2  rounded-br-none rounded-xl max-w-[58%]">
          <ThemedText className='text-lg leading-tight'>
            {message}

          </ThemedText>
        </View>
      </View>
    </>
  );
}
