import { Image, View } from 'react-native';
import ThemedText from './ThemedText';
import { Images } from '@/lib/staticAssetExports';
import { CommonStaticElementProps } from '@/constants/types';
export default function Footer({ language }: { language: 'EN' | 'HU' }) {
  return (
    <View className=" w-full flex flex-col secondary pb-safe pt-3 items-center justify-center">
      <Image source={Images.logo_black} className="h-6 mb-2 muted " resizeMode="contain" />
      <ThemedText className="text-center text-xl">© 2025 Au-O</ThemedText>
      <ThemedText className="text-center text-sm">
        {language === 'EN' ? 'All rights reserved' : 'Minden jog fenntartva'}
      </ThemedText>
    </View>
  );
}
