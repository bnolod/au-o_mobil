/**
 * DirectMessage komponens
 * @module chat/base/DirectMessage
 * @category Components
 */
import { Pressable, Text, View } from 'react-native';
import { DirectMessageItemProps } from '../props';
import Avatar from '@/components/ui/Avatar';
import ThemedText from '@/components/ui/ThemedText';
import { router } from 'expo-router';
import { ChatTexts } from '@/constants/texts';
/**
 * Közvetlen üzenetet megjelenítő komponens
 * @property {User} user Felhasználó
 * @property {User} latestMessage Legutóbbi üzenet
 * @property {string} date Dátum
 * @property {"HU" | "EN"} language Nyelv
 * @see DirectMessageItemProps
 * @returns 
 */
export default function DirectMessageItem({ user, latestMessage, date, language }: DirectMessageItemProps & {language: "HU" | "EN"}) {
  //console.log('latestmessage:' + latestMessage.active);

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
            {latestMessage.message.message.startsWith("{{POST_") ? "📷 " + ChatTexts.sentPost[language] :
            latestMessage.message.message.startsWith("{{GROUP_") ? "🥳 " + ChatTexts.invited[language] 
            : latestMessage.message.message.startsWith("{{VEHICLE_") ? "🏎 " + ChatTexts.sentCar(user.id === latestMessage.id)[language] : latestMessage.message.message}
          </ThemedText>
        </View>
      </View>
      <Text className=" pr-6 dark:text-highlight text-highlight-light">{date.split(' ')[0]}</Text>
    </Pressable>
  );
}
