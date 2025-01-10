import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import SvgHeaderDecoration from '../graphics/HeaderDecoration';
import { useColorScheme } from 'nativewind';
export default function OnboardingHeader() {
    const {colorScheme} = useColorScheme()

  return (
    <View className="basis-3/12 w-full">
      <SvgHeaderDecoration theme={colorScheme} boxWidth={Dimensions.get("screen").width - 40} />
      <View className='flex w-full absolute top-[30%] items-center'>
        
      <Image
        source={require('@/assets/images/auo-logo.png')}
        className="h-12"
        resizeMode="contain"
        />
        </View>
      {/*skippable && (
        <TouchableOpacity
        className="button btn-transparent"
        onPress={() => {}}
      */}
    </View>
  );
}
