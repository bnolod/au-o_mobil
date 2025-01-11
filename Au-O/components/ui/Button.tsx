import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { ButtonProps } from '@/constants/types';
import * as Haptics from 'expo-haptics';

export default function Button({ variant, type, hapticFeedback, children, ...props }: ButtonProps) {
  const getButtonClass = (variant: ButtonProps['variant']) => {
    switch (variant) {
      case 'highlight':
        return 'button btn-highlight';
      case 'highlight-light':
        return 'button btn-highlight-light';
      case 'highlight-dark':
        return 'button btn-highlight-dark';
      case 'transparent':
        return 'button btn-transparent';
      case 'outline':
        return 'button btn-outline';
      default:
        return 'button';
    }
  };

  const getButtonTypeClass = (type: ButtonProps['type']) => {
    switch (type) {
      case 'icon':
        return 'btn-icon';
      case 'fit':
        return 'btn-fit';
      case 'fill':
        return 'btn-fill';
      default:
        return '';
    }
  };

  const handleHaptics = async () => {
    if (hapticFeedback) {
      switch (hapticFeedback) {
        case 'light':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case 'medium':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'heavy':
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
    >
      <ThemedText>{children}</ThemedText>
    </TouchableOpacity>
  );
}