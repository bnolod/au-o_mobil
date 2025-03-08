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
          className={`secondary p-2 
            rounded-l-[2rem] rounded-r-lg py-3 pl-4 pr-3 mt-1  max-w-[58%]
          ${isFirst ? 'rounded-br-[1.5rem]' : ''} `}
        >
          <ThemedText className="text-xl leading-tight">{message}</ThemedText>
        </View>
      </View>
    </>
  );
}
