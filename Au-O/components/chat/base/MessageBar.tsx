/**
 * Üzenet küldésére szolgáló komponens
 * @module chat/base/MessageBar
 * @category Components
 */
import { MessageBarProps } from '../props';
import { TextInput, View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ApiCallButton from '@/components/ui/ApiCallButton';
import { generalTexts } from '@/constants/texts';
/**
 * Üzenet küldésére felületet nyújtó komponens
 * @property {string} text Szöveg
 * @property {Function} onSend Küldés
 * @property {Function} onChange Változás
 * @property {"HU" | "EN"} language Nyelv
 * @see MessageBarProps
 * @returns 
 */
export default function MessageBar({ text, onSend, onChange, language }: MessageBarProps) {
  return (
    <View className="flex flex-row w-full px-2 gap-2 mx-auto justify-between my-2">
      <TextInput value={text} onChangeText={onChange} className="flex-1 secondary text-black dark:text-white p-3 rounded-xl" placeholder={generalTexts.chat.messageBarPlaceholder[language]} />
      <ApiCallButton
delay={1000}
        apiCall={async () => onSend()}
        className=" secondary aspect-square rounded-xl items-center justify-center"
      >
        <ThemedText>
        <MaterialCommunityIcons className=''  name="send-outline" size={24} />
        </ThemedText>
      </ApiCallButton>
    </View>
  );
}
