import Input from '@/components/ui/Input';
import { MessageBarProps } from '../props';
import { KeyboardAvoidingView, TextInput, View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import Button from '@/components/ui/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MessageBar({ user, onSend, onChange }: MessageBarProps) {
  return (
    <View className="flex flex-row w-11/12 mx-auto gap-2 items-center">
      <TextInput onChangeText={onChange} className="basis-10/12 secondary text-black dark:text-white p-6 rounded-xl" placeholder="Type a message..." />
      <Button
        onPress={onSend}
        className="secondary my-2 rounded-xl flex-1 aspect-square flex items-center justify-center"
      >
        <MaterialCommunityIcons name="send-outline" size={30} />
      </Button>
    </View>
  );
}
