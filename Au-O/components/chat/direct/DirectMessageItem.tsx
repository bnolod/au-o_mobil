import { View } from 'react-native';
import { DirectMessageItemProps } from '../props';
import Avatar from '@/components/ui/Avatar';
import ThemedText from '@/components/ui/ThemedText';

export default function DirectMessageItem({ user, contact, lastMessage, date }: DirectMessageItemProps) {
  return (
    <View className="flex w-full p-3">
      <Avatar image={contact.profileImg && { uri: contact.profileImg }} nickname={contact.nickname} />
      <View className='flex flex-col w-full'>
        <ThemedText className="tlg">{contact.nickname}</ThemedText>
        <ThemedText>{lastMessage}</ThemedText>
      </View>
      <ThemedText>
        {new Date(date).getDay()}
      </ThemedText>
    </View>
  );
}
