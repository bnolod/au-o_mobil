/**
 * Töltőképernyő modal komponens
 * @module ui/LoadingModal
 * @category Component
 */
import { Colors } from '@/constants/Colors';
import { ActivityIndicator, Modal, View } from 'react-native';
import ThemedText from './ThemedText';
import { LoadingModalProps } from './props';
/**
 * @param {LoadingModalProps} props Tulajdonságok
 */
export default function LoadingModal({
  loading,
  text,
  onStart,
  onEnd,
  colorScheme,
}: LoadingModalProps & { colorScheme: 'light' | 'dark' }) {
  return (
    <Modal transparent={true} visible={loading} animationType="fade" onShow={onStart} onDismiss={onEnd}>
      <View className="flex bg-black/40 flex-col gap-4 w-screen mx-auto h-screen absolute justify-center items-center rounded-xl p-4">
        <View className="secondary rounded-xl p-4">
          <ActivityIndicator size="large" color={Colors.highlight.main} />
          {text && <ThemedText className="text-center text-lg font-bold">{text}</ThemedText>}
        </View>
      </View>
    </Modal>
  );
}
