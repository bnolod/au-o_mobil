import { Keyboard, Pressable, ScrollView, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import Input from "@/components/ui/Input";
import { useColorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function newCar() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  return (
    <ScrollView>
      <Pressable
        className="flex h-screen flex-col"
        onPress={() => Keyboard.dismiss()}
      >
        <Input label="Make" icon="car-estate" colorScheme={colorScheme!}  />
      </Pressable>
    </ScrollView>
  );
}
