import { View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import Button from '../ui/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NewSocialProps } from '@/constants/types';

export default function NewSocial({ text, onPress }: NewSocialProps) {
  return (
    <Button className="new-social-button" hapticFeedback="light" onPress={onPress}>
      <View className="new-social-button-text-continer">
        <View>
          <MaterialCommunityIcons name="plus" size={32} color="white" />
        </View>
        <ThemedText className="text-white">{text}</ThemedText>
      </View>
    </Button>
  );
}
