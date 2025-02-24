import { View } from 'react-native';
import ThemedText from './ThemedText';
import { Images } from '@/lib/staticAssetExports';
import { Image } from 'expo-image';
export default function Footer({ language }: { language: 'EN' | 'HU' }) {
  return (
    <View className=" w-full flex flex-col secondary pb-safe pt-3 items-center justify-center">
      <Image source={Images.logo_white} className="h-6 mb-2 muted " style={{height: 24, width: "100%", marginBottom: 4, opacity: 0.65}} contentFit="contain" />
      <ThemedText className="text-center text-xl">© 2025 Au-O</ThemedText>
      <ThemedText className="text-center text-sm">
        {language === 'EN' ? 'All rights reserved' : 'Minden jog fenntartva'}
      </ThemedText>
    </View>
  );
}
