import Avatar from '@/components/ui/Avatar';
import ThemedText from '@/components/ui/ThemedText';
import { View } from 'react-native';
import { MessageProps } from '../props';
import MessagePost from '../media/MessagePost';

export default function UserMessage({ message, isFirst, isLast }: MessageProps) {
  if (message.startsWith("{{POST_") && message.endsWith("_}}")) {
    return <MessagePost colorScheme={"dark"} postId={Number(message.split("_")[1])} />;
  }
  return (
    <>
      <View className="flex flex-row-reverse items-end gap-2 pr-2">
        <View
          className={`secondary p-2 max-w-[58%]
           ${isLast ? 'rounded-t-xl' : ''}
           ${isFirst ? (isLast ? 'my-1' : 'mt-1') : 'mt-1'}
           ${isFirst ? 'rounded-bl-xl' : ''}`}
        >
          <ThemedText className="text-lg leading-tight">{message}</ThemedText>
        </View>
      </View>
    </>
  );
}
