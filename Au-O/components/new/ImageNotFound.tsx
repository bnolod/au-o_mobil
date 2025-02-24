import { Colors } from '@/constants/Colors';
import { CommonStaticElementProps } from '@/constants/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import ThemedText from '../ui/ThemedText';
import { PostCreationTexts } from '@/constants/texts';

export default function ImageNotFound({
  onPress,
  colorScheme,
  language,
}: { onPress: () => void } & CommonStaticElementProps) {
  return (
    <>
      <TouchableWithoutFeedback onPress={onPress}>
        <View className="new-post-image-upload-prompt">
          <MaterialCommunityIcons
            name="image-search"
            size={64}
            color={Colors[colorScheme!].text}
            style={{ textAlign: 'center' }}
          />
          <ThemedText className="text-xl font-bold">{PostCreationTexts.uploadPrompt[language]}</ThemedText>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}
