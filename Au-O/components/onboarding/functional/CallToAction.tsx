/**
 * Kezdőképernyő fő gomb
 * @module onboarding/functional/CallToAction
 * @category Components
 */
import { View } from 'react-native';
import Button from '@/components/ui/Button';
import { ThemedText } from '@/components/ui/ThemedText';
import { Colors } from '@/constants/Colors';
import { CallToActionTexts } from '@/constants/texts';
import { CommonStaticElementProps } from '@/constants/types';
/**
 * @property {function} onPress Gombnyomás esemény
 * @property {number} index Index
 * @property {string} language Nyelv
 */
export default function CallToAction({
  onPress,
  index,
  language,
}: {
  onPress: () => void;
  index: number;
} & CommonStaticElementProps) {
  return (
    <View className=" w-full items-end justify-end flex flex-col pb-12 basis-2/12">
      <Button hapticFeedback="medium" className="highlight button btn-fill" onPress={onPress}>
        <ThemedText className="font-semibold text-2xl text-white" color={Colors.light.background}>
          {CallToActionTexts[(index + 1).toString() as unknown as keyof typeof CallToActionTexts][language]}
        </ThemedText>
      </Button>
    </View>
  );
}
