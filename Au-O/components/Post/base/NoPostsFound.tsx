/**
 * Poszt nem található
 * @module post/base/NoPostsFound
 * @category Components
 */
import { View } from 'react-native';
import ThemedText from '../../ui/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { PostStatusTexts } from '@/constants/texts';
/**
 * @param {language: 'EN' | 'HU'} props Tulajdonságok
 */
export default function NoPostsFound({ language }: { language: 'EN' | 'HU' }) {
  return (
    <View className="no-posts-container">
      <MaterialCommunityIcons name="cloud-question" size={64} color={Colors.highlight.main} />
      <ThemedText>{PostStatusTexts.notFound[language]}</ThemedText>
    </View>
  );
}
