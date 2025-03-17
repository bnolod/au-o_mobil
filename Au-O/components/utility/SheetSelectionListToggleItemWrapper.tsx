/**
 * Kiválasztási lista wrapper
 * @module utility/SheetSelectionListToggleItemWrapper
 * @category Utility
 */
import { Pressable, View } from 'react-native';
import { ReactNode, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
/**
 * @property {ReactNode} children Leszármazott elemek
 * @property {Function} onPress Kattintási esemény
 */
export default function SheetSelectionListItemToggleWrapper({
  children,
  onPress,
}: {
  children: ReactNode;
  onPress: () => void;
}) {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  return (
    <>
      <Pressable
        onPress={() => {
          setIsSelected((prev) => !prev);
          onPress;
        }}
      >
        {isSelected && (
          <View className="absolute flex w-full z-50 justify-center items-center h-full">
            <MaterialCommunityIcons name="check" size={52} color={Colors.highlight.main} />
          </View>
        )}
        <View className={`${isSelected ? 'opacity-30' : 'opacity-100'} pointer-events-none`}>{children}</View>
      </Pressable>
    </>
  );
}
