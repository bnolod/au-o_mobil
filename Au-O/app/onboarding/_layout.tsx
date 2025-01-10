import OnboardingHeader from "@/components/onboarding/Header";
import { ThemedText } from "@/components/ThemedText";
import { OnboardingLayoutProps } from "@/constants/types";
import { Slot } from "expo-router";
import React from "react";
import {TouchableOpacity, View } from "react-native";
import { useColorScheme } from "nativewind";
import Button from "@/components/ui/Button";
import CallToAction from "@/components/onboarding/CallToAction";
import { OnboardingTexts } from "@/constants/texts";
import { useLanguage } from "../contexts/LanguageContext";
import SvgSlide1Image from "@/components/graphics/Slide1Image";

export default function OnboardingLayout({
  headerText,
  heroText,
  ctaText,
  skippable,
}: OnboardingLayoutProps) {
    const {language} = useLanguage()
    const {colorScheme} = useColorScheme()
  return (
    <>
      <View className=" h-screen overflow-y-hidden w-full mx-auto">
        <OnboardingHeader />
        <View className="container flex flex-col justify-between py-5">
          <View className="basis-7/12 flex flex-col-reverse justify-between items-center">
            {/*content*/}
            <ThemedText className="font-semibold  text-5xl text-center">
                {OnboardingTexts.slide1[language]}
            </ThemedText>
            <View className="scale-110">

            <SvgSlide1Image scale={20} theme={colorScheme}/>
            </View>
            
            <Slot />
            
          </View>
            <CallToAction/>
        </View>
      </View>
    </>
  );
}
