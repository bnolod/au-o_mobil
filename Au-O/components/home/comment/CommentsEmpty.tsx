import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { HomeTexts } from '@/constants/texts';
import { CommonStaticElementProps } from '@/constants/types';

export default function CommentsEmpty({ language, colorScheme }: CommonStaticElementProps) {
  return (
    <View className="root-comment-empty-container">
      <MaterialCommunityIcons name="comment-remove-outline" size={64} color={Colors[colorScheme!].text} />
      <ThemedText className="text-3xl">{HomeTexts.post.nocomments[language!]}</ThemedText>
      <ThemedText className="text-xl">{HomeTexts.post.addcomment[language!]}</ThemedText>
    </View>
  );
}
