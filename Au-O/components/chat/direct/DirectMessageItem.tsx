import { Pressable, Text, View } from 'react-native';
import { DirectMessageItemProps } from '../props';
import Avatar from '@/components/ui/Avatar';
import ThemedText from '@/components/ui/ThemedText';
import { router } from 'expo-router';

export default function DirectMessageItem({ user, latestMessage, date }: DirectMessageItemProps) {
  console.log('latestmessage:' + latestMessage.active);

  return (
    <Pressable
      onPress={() => router.push({ pathname: '/(root)/chat/[id]', params: { id: latestMessage.id } })}
      className="flex flex-row w-screen mt-3 justify-between items-center   rounded-lg"
    >
      <View className="flex flex-row items-center">
        <View className="scale-75">
          <Avatar
            image={latestMessage.profileImg && latestMessage.profileImg }
            nickname={latestMessage.nickname}
            height={20}
            width={20}
          />
        </View>
        <View className="flex flex-col">
          <ThemedText className="text-xl font-bold">
            {latestMessage.nickname}{' '}
            {latestMessage.active && <Text className="font-bold dark:text-green-500 text-green-800"> • Online</Text>}
          </ThemedText>
          <ThemedText numberOfLines={1} className="font-light text-lg muted max-w-[60vw]">
            {user.username == latestMessage.message.user.username && (
              <Text className="font-bold dark:text-highlight text-highlight-light">You: </Text>
            )}
            {latestMessage.message.message}
          </ThemedText>
        </View>
      </View>
      <Text className=" pr-6 dark:text-highlight text-highlight-light">{date.split(' ')[0]}</Text>
    </Pressable>
  );
}
