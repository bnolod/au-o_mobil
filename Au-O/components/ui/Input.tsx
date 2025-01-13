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
  secureTextEntry = false,
  TextInputProps,
  icon,
}: {
  label?: string;
  secureTextEntry?: boolean;
  TextInputProps?: TextInputProps;
  icon?: any;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(false);
  return (
    <TouchableWithoutFeedback
    className=" w-full"
      onPress={Keyboard.dismiss}
      
    >
      <View className={`m-2  w-11/12 gap-x-2 flex justify-between  mx-auto ${isFocused ? " z-50" : ""}`}>
        {label && <ThemedText className="text-lg mb-1">{label}</ThemedText>}
        <View
          className={`flex flex-row justify-start items-center bg-backdrop-secondary dark:bg-backdrop-secondary-dark relative rounded-full border ${
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
            className="rounded-full mb-1 p-4 w-3/4 text-left font-semibold dark:text-background "
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
