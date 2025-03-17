/**
 * Kezdőképernyő fejléc
 * @module onboarding/base/Header
 * @category Components
 */
import React from 'react';
import { Dimensions, Platform, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import SvgHeaderDecoration from '@/components/graphics/HeaderDecoration';
import Button from '@/components/ui/Button';
import { ButtonTexts } from '@/constants/texts';
import { CommonStaticElementProps } from '@/constants/types';
import { OnboardHeaderProps } from './props';
import { Image } from 'expo-image';
import { Images } from '@/lib/staticAssetExports';
/**
 * @param {OnboardHeaderProps} props
 */
export default function OnboardingHeader({
  isStatic,
  onBackPress,
  onSkipPress,
  index,
  language,
  colorScheme,
}: OnboardHeaderProps & CommonStaticElementProps) {
  return (
    <View className={`basis-3/12 w-full z-40 ${isStatic ? 'absolute top-0' : ''}`} style={{ zIndex: 40 }}>
      <SvgHeaderDecoration
        theme={colorScheme}
        boxWidth={Platform.OS === 'ios' ? Dimensions.get('screen').width - 40 : Dimensions.get('screen').width}
        height={Platform.OS === 'ios' ? '100%' : '90%'}
      />
      <View
        className={`flex flex-row-reverse w-full px-5 justify-between absolute  ios:top-[30%] android:top-safe-offset-3 items-center`}
      >
        {!isStatic && (
          <Button
            className={`basis-3/12 ml-0 ${index === 2 && 'opacity-0'}`}
            hapticFeedback="heavy"
            variant="transparent"
            type="fit"
            onPress={onSkipPress || (() => {})}
          >
            <ThemedText className={`font-semibold text-lg text-right text-white `}>
              {ButtonTexts.skip[language]}
            </ThemedText>
          </Button>
        )}

        <Image
          source={Images.logo_white}
          style={{height: 54, width: 126, marginHorizontal: "auto"}}
          contentFit="contain"
        />
        {!isStatic && (
          <Button
            className="basis-3/12"
            hapticFeedback="light"
            variant="transparent"
            type="fit"
            onPress={onBackPress || (() => {})}
          >
            <ThemedText className={`font-semibold text-lg text-left ${index === 0 && 'opacity-0'} text-white`}>
              {ButtonTexts.back[language]}
            </ThemedText>
          </Button>
        )}
      </View>
    </View>
  );
}
