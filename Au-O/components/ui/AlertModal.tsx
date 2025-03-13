/**
 * Figyelmeztető modális ablak
 * @module ui/AlertModal
 * @category Component
 */
import { Modal, TouchableOpacity, View } from 'react-native';
import ThemedText from './ThemedText';
import { AlertModalProps } from './props';
/**
 * Értesítési modal
 * @param {AlertModalProps} props Tulajdonságok
 */
export default function AlertModal({
  visible,
  onDismiss,
  title,
  text,
  buttons,
}: AlertModalProps) {
  return (
    <Modal visible={visible} animationType="fade" onDismiss={onDismiss} transparent={true}>
      <TouchableOpacity className="w-full h-full bg-black/50 flex items-center justify-center" onPress={onDismiss}>
        <View className="primary w-3/4 p-3 rounded-xl">
          <ThemedText className="txl text-center">{title}</ThemedText>
          <View className="divider opacity-40" />
          <ThemedText className="text-center mb-2">{text}</ThemedText>
          {buttons.map((button, index) => {
            if (!button) return;
            return (
              <TouchableOpacity onPress={button.onPress} key={index} className={button.className + ' my-2'}>
                <ThemedText className={button.textClassName}>{button.text}</ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
