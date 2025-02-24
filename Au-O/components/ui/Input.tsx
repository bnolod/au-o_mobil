import { Keyboard, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import ThemedText from './ThemedText';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { InputProps } from '@/constants/types';
export default function Input({
  label,
  containerClassName,
  secureTextEntry = false,
  TextInputProps,
  icon,
  size,
  colorScheme,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(false);
  return (
    <TouchableWithoutFeedback className={' w-full ' + ''} onPress={Keyboard.dismiss}>
      <View className={`input-container my-4 ${isFocused ? ' z-50' : ''} ${containerClassName}`}>
        <View
          className={`input-body pt-2 border-0 ${isFocused ? 'border-backdrop-primary' : ''}`}
          style={{
            shadowColor: !isFocused ? Colors[colorScheme].background : Colors.highlight.main,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isFocused ? 0.45 : 0.8,
            shadowRadius: 2,
            elevation: 5,
          }}
        >
          <View className="absolute  text-gray-500 -top-3 -left-3 flex flex-row-reverse justify-center items-center">
            {label && <ThemedText className="tlg  text-gray-500"> {label}</ThemedText>}
            <MaterialCommunityIcons name={icon} size={size || 24} color={Colors[colorScheme].text} />
          </View>
          <TextInput
            className="text-input"
            onFocus={() => {
              setIsFocused(true);
              setIsSecure(secureTextEntry);
            }}
            onBlur={() => setIsFocused(false)}
            secureTextEntry={isSecure}
            style={{
              backgroundColor: 'transparent',
              color: Colors[colorScheme].text,
            }}
            placeholderTextColor={'#767676'}
            autoComplete="off"
            textContentType="none"
            {...TextInputProps}
          />
          {secureTextEntry && (
            <TouchableWithoutFeedback
              className="text-right h-3 w-full"
              hitSlop={40}
              onPress={() => {
                setIsSecure(!isSecure);
              }}
            >
              <MaterialCommunityIcons
                style={{ right: 12, position: 'absolute' }}
                name={isSecure ? 'eye-off' : 'eye'}
                size={24}
                color={colorScheme === 'dark' ? 'white' : 'black'}
              />
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
