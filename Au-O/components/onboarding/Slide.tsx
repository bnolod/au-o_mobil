import React, { ReactNode } from "react";
import { View } from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";


export default function Slide({text, image}: {text: string, image: ReactNode}) {
  return (
    <View className="flex-1 justify-between mb-5 flex-col items-center">
      <ThemedText className="font-semibold text-5xl text-center">
        {text}
      </ThemedText>
      <View>
        {image}
      </View>
    </View>
  );
}
