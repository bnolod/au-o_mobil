import React from "react";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ButtonProps } from "@/constants/types";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";

export default function Button({
  variant,
  type,
  hapticFeedback,
  children,
  innerTextClassName,
  ...props
}: ButtonProps) {
  const { colorScheme } = useColorScheme();
  const getButtonClass = (variant: ButtonProps["variant"]) => {
    switch (variant) {
      case "highlight":
        return "button btn-highlight";
      case "highlight-light":
        return "button btn-highlight-light";
      case "highlight-dark":
        return "button btn-highlight-dark";
      case "transparent":
        return "button btn-transparent";
      case "outline":
        return "button btn-outline";

      default:
        return "button";
    }
  };

  const getButtonTypeClass = (type: ButtonProps["type"]) => {
    switch (type) {
      case "icon":
        return "btn-icon";
      case "fit":
        return "btn-fit";
      case "fill":
        return "btn-fill";
      default:
        return "";
    }
  };

  const handleHaptics = async () => {
    if (hapticFeedback) {
      switch (hapticFeedback) {
        case "light":
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case "medium":
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case "heavy":
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        default:
          break;
      }
    }
  };

  return (
    <TouchableOpacity
      className={`${getButtonClass(variant)} ${getButtonTypeClass(type)}`}
      {...props}
      onPressOut={handleHaptics}
      style={{
        shadowColor: Colors[colorScheme!].background,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
      }}
    >
      <ThemedText className={innerTextClassName}>{children}</ThemedText>
    </TouchableOpacity>
  );
}
