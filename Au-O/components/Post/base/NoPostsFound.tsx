/**
 * Poszt nem található
 * @module post/base/NoPostsFound
 * @category Components
 */
import { View } from 'react-native';
import ThemedText from '../../ui/ThemedText';
import Button from '../../ui/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { PostStatusTexts } from '@/constants/texts';
/**
 * @param {language: 'EN' | 'HU'} props Tulajdonságok
 */
export default function NoPostsFound({ language, onRefresh }: { language: 'EN' | 'HU', onRefresh?: () => void }) {
  return (
    <View className="no-posts-container">
      <MaterialCommunityIcons name="cloud-question" size={64} color={Colors.highlight.main} />
      <ThemedText>{PostStatusTexts.notFound[language]}</ThemedText>
      {onRefresh &&
      <Button className="highlight-themed m-1 button" innerTextClassName="txl" onPress={onRefresh}>Refresh</Button>
          }
    </View>
  );
}
