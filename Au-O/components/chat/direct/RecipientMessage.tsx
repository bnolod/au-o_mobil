import { View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { MessageProps } from '../props';
import Avatar from '@/components/ui/Avatar';

export default function RecipientMessage({ profilePic, id, nickname, message }: MessageProps) {
  return (
    <View className="flex flex-row   items-end gap-2 my-2 pl-2">
      <Avatar className="w-10 h-10 secondary" image={profilePic ? { uri: profilePic } : null} nickname={nickname} />
      <View className="bg-highlight-light dark:bg-highlight-dark p-2 rounded-bl-none rounded-xl max-w-[58%]">
        <ThemedText className="text-lg leading-tight">
{message}
        </ThemedText>
      </View>
    </View>
  );
}
