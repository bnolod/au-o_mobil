import {
  Keyboard,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ThemedText from "./ThemedText";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colorScheme } from "nativewind";


export default function Input({
  label,
  containerClassName,
  secureTextEntry = false,
  TextInputProps,
  icon,
}: {
  label?: string;
  secureTextEntry?: boolean;
  TextInputProps?: TextInputProps;
  containerClassName?: string;
  icon?: any;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(false);
  return (
    <TouchableWithoutFeedback
    className={" w-full " + ""}
      onPress={Keyboard.dismiss}
      
    >
      <View className={`input-container ${isFocused ? " z-50" : ""} ${containerClassName}`}>
        {label && <ThemedText className="text-lg mb-1">{label}</ThemedText>}
        <View
          className={`input-body ${
            isFocused
              ? "border-backdrop-primary"
              : ""
          }`}
        >
          {
            icon && (
              <View className="pl-4">
                {icon}
              </View>
            )
          }
          <TextInput
            className="text-input "
            onFocus={() => {setIsFocused(true); setIsSecure(secureTextEntry)}}
            onBlur={() => setIsFocused(false)}
            secureTextEntry={isSecure}
            style={{backgroundColor: "transparent"}}
            autoComplete="off"
            textContentType="none"
            
            
            {...TextInputProps}
            />
            {secureTextEntry && (
              <TouchableWithoutFeedback
              className="text-right h-3 w-full"
                hitSlop={40}
                onPress={() => {setIsSecure(!isSecure)}}
              >
                <MaterialCommunityIcons style={{right: 12, position: "absolute"}} name={isSecure ? "eye-off" : "eye"} size={24} color={colorScheme.get() === "dark" ? "white" : "black"} />

              </TouchableWithoutFeedback>
            )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
