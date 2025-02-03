import React from "react";
import { Dimensions, Image, Platform, View } from "react-native";
import { ThemedText } from "../ui/ThemedText";
import SvgHeaderDecoration from "../graphics/HeaderDecoration";
import Button from "../ui/Button";
import { ButtonTexts } from "@/constants/texts";
import { CommonStaticElementProps } from "@/constants/types";
export default function OnboardingHeader({
  isStatic,
  onBackPress,
  onSkipPress,
  index,
  language,
  colorScheme,
}: {
  isStatic?: boolean;
  onBackPress?: () => void;
  onSkipPress?: () => void;
  index?: number;
} & CommonStaticElementProps) {

  return (
    <View
      className={`basis-3/12 w-full z-40 ${isStatic ? "absolute top-0" : ""}`}
      style={{ zIndex: 40 }}
    >
      <SvgHeaderDecoration
        theme={colorScheme}
        boxWidth={Platform.OS === "ios" ? Dimensions.get("screen").width - 40 : Dimensions.get("screen").width}
        height={Platform.OS === "ios" ? "100%" : "90%"}
      />
      <View
        className={`flex flex-row-reverse w-full px-5 justify-between absolute  ios:top-[30%] android:top-safe-offset-3 items-center`}
      >
        {!isStatic && (
          <Button
            className={`basis-3/12 ml-0 ${index === 2 && "opacity-0"}`}
            hapticFeedback="heavy"
            variant="transparent"
            type="fit"
            onPress={onSkipPress || (() => {})}
          >
            <ThemedText
              className={`font-semibold text-lg text-right text-white `}
            >
              {ButtonTexts.skip[language]}
            </ThemedText>
          </Button>
        )}

        <Image
          source={require("@/assets/images/auo-logo.png")}
          className="h-12 basis-6/12 mx-auto text-center"
          resizeMode="contain"
          
        />
        {!isStatic && (
          <Button
            className="basis-3/12"
            hapticFeedback="light"
            variant="transparent"
            type="fit"
            onPress={onBackPress || (() => {})}
          >
            <ThemedText
              className={`font-semibold text-lg text-left ${
                index === 0 && "opacity-0"
              } text-white`}
            >
              {ButtonTexts.back[language]}
            </ThemedText>
          </Button>
        )}
      </View>
    </View>
  );
}
