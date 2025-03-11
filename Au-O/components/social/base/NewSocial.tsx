import { View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import Button from '@/components/ui/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NewSocialProps } from './props';

export default function NewSocial({ text, onPress }: NewSocialProps) {
  return (
    <Button className="new-social-button" hapticFeedback="light" onPress={onPress}>
      <View className="flex flex-row gap-2">
        <View>
          <MaterialCommunityIcons name="plus" size={32} color="white" />
        </View>
        <ThemedText className="text-white self-center">{text}</ThemedText>
      </View>
    </Button>
  );
}
