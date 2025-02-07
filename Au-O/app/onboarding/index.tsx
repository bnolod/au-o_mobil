import React, { useRef, useState } from "react";
import { Dimensions, Platform, View } from "react-native";
import { useColorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import { OnboardingTexts } from "@/constants/texts";
import OnboardingHeader from "@/components/onboarding/Header";
import SvgSlide1Image from "@/components/graphics/Slide1Image";
import {
  OnboardingProvider,
} from "@/contexts/OnboardingContext";
import CallToAction from "@/components/onboarding/CallToAction";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

import Slide from "../../components/onboarding/Slide";
import SvgSlide2Image from "@/components/graphics/Slide2Image";
import SvgSlide3Image from "@/components/graphics/Slide3Image";
import { Redirect, router } from "expo-router";
import { useAuthentication } from "@/contexts/AuthenticationContext";
export default function Onboarding() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  const carouselRef = useRef<ICarouselInstance>(null);
  const [index, setIndex ] = useState(0)
  const {user} = useAuthentication()

  if (user) {
    return <Redirect href={"/(root)/home"} />;
  }
  return (
    <OnboardingProvider>

      <View className="h-screen-safe overflow-y-hidden w-full mx-auto">
        <OnboardingHeader colorScheme={colorScheme!} language={language} index={index} onBackPress={() => {
          carouselRef.current?.prev()
        }} onSkipPress={() => (router.replace("/(auth)/register"))} />
        <View className=" flex flex-col justify-between pb-5">
          <View className="basis-8/12 flex flex-col-reverse items-center justify-center">
            <Carousel
              ref={carouselRef}
              enabled={false}
              loop={false}
              data={[
                {
                  text: OnboardingTexts.slide1[language],
                  image: <View style={Platform.OS === "ios" ? { transform: [{ scale: 1.2 }]} : {}}><SvgSlide1Image theme={colorScheme} /></View>,
                },
                {
                  text: OnboardingTexts.slide2[language],
                  image: <SvgSlide2Image theme={colorScheme} />,
                },
                {
                  text: OnboardingTexts.slide3[language],
                  image: <SvgSlide3Image theme={colorScheme} />,
                },
              ]}
              width={Dimensions.get("screen").width}
              onSnapToItem={(index) => setIndex(index)}
              renderItem={({ item}) => {
                
                return(

                  <Slide text={item.text} image={item.image} />
                )
            }}
            />
          </View>
        </View>
          <CallToAction colorScheme={colorScheme!} language={language} index={index} onPress={index !== 2 ? () => carouselRef.current?.next() : () => router.replace('/(auth)/register')} />
      </View>
    </OnboardingProvider>
  );
}
