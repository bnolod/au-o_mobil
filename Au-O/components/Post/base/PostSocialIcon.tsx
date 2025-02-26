import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
export default function PostSocialIcon({
  colorScheme,
  icon,
}: {
  colorScheme: 'light' | 'dark';
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}) {
  return (
    <TouchableOpacity className="post-header-social-container">
      <MaterialCommunityIcons name={icon} size={32} color={Colors[colorScheme].text} />
    </TouchableOpacity>
  );
}
