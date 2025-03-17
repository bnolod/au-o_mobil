/**
 * Létrehozás fejléc
 * @module social/base/CreationHeader
 * @category Components
 */
import { Images } from '@/lib/staticAssetExports';
import { Image } from 'expo-image';
import { View } from 'react-native';
/**
 * @property {string} colorScheme - Szín séma
 */
export default function CreationHeader({ colorScheme }: { colorScheme: 'light' | 'dark' }) {
  return (
    <View className="w-full justify-evenly flex flex-col pt-safe-offset-1 secondary">
      <Image
        source={colorScheme === 'light' ? Images.logo_black : Images.logo_white}
        contentFit="contain"
        style={{ margin: 'auto', height: 32, width: 96, marginBottom: 8 }}
      />
    </View>
  );
}
