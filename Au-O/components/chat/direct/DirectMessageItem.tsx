import { Pressable, Text, View } from 'react-native';
import { DirectMessageItemProps } from '../props';
import Avatar from '@/components/ui/Avatar';
import ThemedText from '@/components/ui/ThemedText';
import { router } from 'expo-router';

export default function DirectMessageItem({ user, latestMessage, date }: DirectMessageItemProps) {
  return (
    <Pressable onPress={() => router.push({pathname: "/(root)/chat/[id]", params: {id: latestMessage.id}})} className="flex flex-row gap-2 justify-between items-center primary p-3 py-5">
      <View className='flex flex-row items-center gap-4'>

      <Avatar image={latestMessage.profileImg && { uri: latestMessage.profileImg }} nickname={latestMessage.nickname} />
      <View className='flex flex-col'>
        <ThemedText className="tlg">
          {latestMessage.nickname} {latestMessage.isActive && <Text className='dark:text-highlight text-highlight-light'>•</Text>}
          </ThemedText>
        <ThemedText numberOfLines={1} className='font-light muted max-w-xs'>
        {user.username === latestMessage.username && <Text className='font-bold dark:text-highlight text-highlight-light'>
            You:{" "}
          </Text>}
          {latestMessage.message.message}</ThemedText>
      </View>
      </View>
      <Text className='dark:text-highlight text-highlight-light'>
        {date.split(" ")[0]}
      </Text>
    </Pressable>
  );
}
