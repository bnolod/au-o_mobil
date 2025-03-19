/**
 * RecipientMessage.tsx
 * A címzett üzenete
 * @module chat/direct/RecipientMessage
 * @category Components
 */
import { View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { MessageProps } from '../props';
import Avatar from '@/components/ui/Avatar';
import MessagePost from '../media/MessagePost';
import GroupInvite from '../media/GroupInvite';
import VehicleCard from '../media/VehicleCard';
/**
 * A címzett által küldött üzenet
 * @property {string} profilePic Profilkép
 * @property {number} id Azonosító
 * @property {string} nickname Becenév
 * @property {string} message Üzenet
 * @property {boolean} isLast Utolsó
 * @property {boolean} isFirst Első
 */
export default function RecipientMessage({ profilePic, id, nickname, message, isLast, isFirst, colorScheme, language }: MessageProps) {
   if (message.startsWith("{{POST_") && message.endsWith("_}}")) {
      return <MessagePost avatar={{
        profileImg: profilePic,
        nickname: nickname,
      }} language={language} sender={false} colorScheme={colorScheme} postId={Number(message.split("_")[1])} />;
    }
      if (message.startsWith("{{GROUP_") && message.endsWith("_}}")) {
        return <GroupInvite avatar={{
          profileImg: profilePic,
          nickname: nickname,
        }} sender={false} language={language} colorScheme={colorScheme} groupId={Number(message.split("_")[1])} />;
      }
      if (message.startsWith("{{VEHICLE_") && message.endsWith("_}}")) {
          return <VehicleCard sender={false} language={language} colorScheme={colorScheme} vehicleId={Number(message.split("_")[1])} />;
        }
  
  return (
    <View className="flex flex-row  items-end gap-2">
      <View className={`w-14 pt-2`} />
      {isFirst && (
        <Avatar
          className="absolute bottom-1 ml-2 self-center secondary"
          height={12}
          width={12}
          image={profilePic ? profilePic : null}
          nickname={nickname}
        />
      )}
      <View
        className={`bg-highlight-light rounded-r-[2rem] rounded-l-md dark:bg-highlight-dark py-3 px-4 mt-1  max-w-[58%]
          ${isFirst ? ' rounded-bl-[1.5rem] ' : ''}
          ${isLast ? ' rounded-tl-[1.5rem] ' : ''}`}
      >
        <ThemedText className="text-xl leading-tight">{message}</ThemedText>
      </View>
    </View>
  );
}
