import {
  Keyboard,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ThemedText from "./ThemedText";
import { ReactNode, useState } from "react";

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
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  return (
    <TouchableWithoutFeedback
    className=" w-full"
      onPress={Keyboard.dismiss}
      
    >
      <View className={`m-2  w-11/12 gap-x-2 mx-auto ${isFocused ? " z-50" : ""}`}>
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
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            secureTextEntry={isSecure}
            
            {...TextInputProps}
            />
            {secureTextEntry && (
              <TouchableWithoutFeedback
              className="text-center mx-auto h-3 w-3 mr-3"
                hitSlop={40}
                onPress={() => {setIsSecure(!isSecure)}}
              >
                <ThemedText className="text-center mx-auto text-3xl mr-2">👁</ThemedText>
              </TouchableWithoutFeedback>
            )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
