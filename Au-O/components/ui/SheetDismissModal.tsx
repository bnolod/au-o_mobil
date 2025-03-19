import { Portal } from '@gorhom/portal';
import { Pressable } from 'react-native';

export default function SheetDismissModal({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  if (!visible) return null;
  else
    return (
      <Portal>
        <Pressable className="w-screen h-screen absolute bg-black/25" onTouchStart={onDismiss} />
      </Portal>
    );
}
