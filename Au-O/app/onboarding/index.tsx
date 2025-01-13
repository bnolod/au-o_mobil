import React, { useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { StatusBar } from "expo-status-bar";
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
import { router } from "expo-router";
export default function Onboarding() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  const carouselRef = useRef<ICarouselInstance>(null);
  const [index, setIndex ] = useState(0)

  return (
    <OnboardingProvider>
      <StatusBar style="light" />
      <View className="h-screen overflow-y-hidden w-full mx-auto">
        <OnboardingHeader />
        <View className="container flex flex-col justify-between py-5">
          <View className="basis-7/12 flex flex-col-reverse justify-between items-center">
            <Carousel
              ref={carouselRef}
              enabled={false}
              loop={false}
              data={[
                {
                  text: OnboardingTexts.slide1[language],
                  image: <View style={{ transform: [{ scale: 1.2 }], marginBottom: 30 }}><SvgSlide1Image theme={colorScheme} /></View>,
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
          <CallToAction index={index} onPress={index !== 2 ? () => carouselRef.current?.next() : () => router.replace('/_sitemap')} />
        </View>
      </View>
    </OnboardingProvider>
  );
}
