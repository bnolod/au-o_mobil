import { View } from "react-native";
import Button from "../ui/Button";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import { CallToActionTexts } from "@/constants/texts";
import { useLanguage } from "@/contexts/LanguageContext";
import { useColorScheme } from "nativewind";
export default function CallToAction({onPress}: {onPress: () => void}) {

const {toggleColorScheme} = useColorScheme()

    const { language } = useLanguage()
  return (
    <View className=" w-full items-end justify-end flex flex-col pb-12 basis-2/12">
      <Button hapticFeedback="medium" variant="highlight" type="fill" onPress={onPress}>
        <ThemedText className="font-semibold text-2xl text-white" color={Colors.light.background}>
            {
                CallToActionTexts.slide1[language]
            }
        </ThemedText>
      </Button>
      <Button hapticFeedback="medium" variant="transparent" type="fit" onPress={() => toggleColorScheme()}>Öcs</Button>
    </View>
  );
}
