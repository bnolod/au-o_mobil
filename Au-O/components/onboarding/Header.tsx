import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import SvgHeaderDecoration from '../graphics/HeaderDecoration';
import { useColorScheme } from 'nativewind';
import Button from '../ui/Button';
import { ButtonTexts } from '@/constants/texts';
import { useLanguage } from '@/contexts/LanguageContext';
export default function OnboardingHeader({isStatic} : {isStatic?: boolean}) {
    const {colorScheme} = useColorScheme()
    const {language} = useLanguage()
  return (
    <View className="basis-3/12 w-full">
      <SvgHeaderDecoration theme={colorScheme} boxWidth={Dimensions.get("screen").width - 40} />
      <View className='flex flex-row-reverse w-full px-5 justify-between absolute top-[30%] items-center'>
       {!isStatic && <Button className='basis-3/12 ml-0' hapticFeedback='heavy' variant="transparent" type="fit" onPress={() => {
       
       }}>
            <ThemedText className={`font-semibold text-lg text-right text-white `}>{ButtonTexts.skip[language]}</ThemedText>
        </Button>
}        
        
      <Image
        source={require('@/assets/images/auo-logo.png')}
        className="h-12 basis-6/12 mx-auto text-center"
        resizeMode="contain"
        />
        {!isStatic && <Button className='basis-3/12' hapticFeedback='light' variant="transparent" type="fit" onPress={() => {}}>
            <ThemedText className="font-semibold text-lg text-left text-white">{ButtonTexts.back[language]}</ThemedText>
        </Button>}
        </View>

    </View>
  );
}
