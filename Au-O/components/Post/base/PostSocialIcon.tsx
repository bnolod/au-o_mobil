/**
 * Poszt közösségi ikon
 * @module post/base/PostSocialIcon
 * @category Components
 */
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
/**
 * @param {colorScheme: 'light' | 'dark', icon: keyof typeof MaterialCommunityIcons.glyphMap} props Tulajdonságok
 */
export default function PostSocialIcon({
  colorScheme,
  icon,
  onPress,
}: {
  onPress?: () => void;
  colorScheme: 'light' | 'dark';
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}) {
  return (
    <TouchableOpacity onPress={onPress} className="post-header-social-container">
      <MaterialCommunityIcons name={icon} size={32} color={Colors[colorScheme].text} />
    </TouchableOpacity>
  );
}
