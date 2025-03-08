import { View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { MessageProps } from '../props';
import Avatar from '@/components/ui/Avatar';

export default function RecipientMessage({ profilePic, id, nickname, message, isLast, isFirst }: MessageProps) {
  return (
    <View className="flex flex-row  items-end gap-2">
      <View className={`w-14 pt-2`} />
      {isFirst && (
        <Avatar
          className="absolute -bottom-2 ml-2 self-center secondary"
          height={12}
          width={12}
          image={profilePic ? profilePic : null}
          nickname={nickname}
        />
      )}
      <View
        className={`bg-highlight-light rounded-r-[2rem] rounded-l-lg dark:bg-highlight-dark py-3 pl-3 pr-4 mt-1  max-w-[58%]
          ${isFirst ? 'rounded-bl-[1.5rem]' : ''}`}
      >
        <ThemedText className="text-xl leading-tight">{message}</ThemedText>
      </View>
    </View>
  );
}
