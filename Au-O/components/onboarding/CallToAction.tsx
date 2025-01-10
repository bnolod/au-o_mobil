import { View } from "react-native";
import Button from "../ui/Button";
import { ThemedText } from "../ThemedText";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";

export default function CallToAction() {
    const { colorScheme, toggleColorScheme } = useColorScheme()
  return (
    <View className=" w-full items-end justify-end flex flex-col pb-12 basis-2/12">
      <Button variant="highlight" type="fill" onPress={() => {toggleColorScheme()}}>
        <ThemedText className="font-semibold text-xl text-white" color={Colors.light.background}>Kuli</ThemedText>
      </Button>
    </View>
  );
}
