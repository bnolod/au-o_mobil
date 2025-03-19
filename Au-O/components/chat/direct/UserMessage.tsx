/**
 * UserMessage.tsx
 * A felhasználó üzenete
 * @module chat/direct/UserMessage
 * @category Components
 */

import ThemedText from '@/components/ui/ThemedText';
import { View } from 'react-native';
import { MessageProps } from '../props';
import MessagePost from '../media/MessagePost';
import GroupInvite from '../media/GroupInvite';
import VehicleCard from '../media/VehicleCard';
/**
 * Saját üzenet
 * @property {string} message Üzenet
 * @property {boolean} isFirst Első
 * @property {boolean} isLast Utolsó
 * @property {string} colorScheme Színséma
 * @returns 
 */
export default function UserMessage({ message, isFirst, isLast, colorScheme, language }: MessageProps) {
  if (message.startsWith("{{POST_") && message.endsWith("_}}")) {
    return <MessagePost language={language} avatar={null} sender colorScheme={colorScheme} postId={Number(message.split("_")[1])} />;
  }
  if (message.startsWith("{{GROUP_") && message.endsWith("_}}")) {
    return <GroupInvite avatar={null} language={language} sender colorScheme={colorScheme} groupId={Number(message.split("_")[1])} />;
  }
  if (message.startsWith("{{VEHICLE_") && message.endsWith("_}}")) {
    return <VehicleCard sender language={language} colorScheme={colorScheme} vehicleId={Number(message.split("_")[1])} />;
  }
  return (
    <>
      <View className={`flex flex-row-reverse items-end gap-2 pr-2`}>
        <View
          className={`secondary p-2 
            rounded-l-[2rem] rounded-r-md py-3 px-4 mt-1  max-w-[58%]
          ${isFirst ? 'rounded-br-[1.5rem] ' : ''}
          ${isLast ? 'rounded-tr-[1.5rem] ' : ''} `}
        >
          <ThemedText className="text-xl leading-tight">{message}</ThemedText>
        </View>
      </View>
    </>
  );
}
