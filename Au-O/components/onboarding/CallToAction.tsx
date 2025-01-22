import { View } from "react-native";
import Button from "../ui/Button";
import { ThemedText } from "../ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { CallToActionTexts } from "@/constants/texts";
import { CommonStaticElementProps } from "@/constants/types";

export default function CallToAction({
  onPress,
  index,
  language,

}: {
  onPress: () => void;
  index: number;
} & CommonStaticElementProps) {
  return (
    <View className=" w-full items-end justify-end flex flex-col pb-12 basis-2/12">
      <Button
        hapticFeedback="medium"
        variant="highlight"
        type="fill"
        onPress={onPress}
      >
        <ThemedText
          className="font-semibold text-2xl text-white"
          color={Colors.light.background}
        >
          {
            CallToActionTexts[
              (
                index + 1
              ).toString() as unknown as keyof typeof CallToActionTexts
            ][language]
          }
        </ThemedText>
      </Button>
    </View>
  );
}
