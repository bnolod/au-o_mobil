import { Image, View } from "react-native";
import ThemedText from "../ui/ThemedText";
import SearchBar from "../ui/SearchBar";
import Button from "../ui/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Images } from "@/lib/staticAssetExports";
import { CommonStaticElementProps } from "@/constants/types";
export default function RootHeader({language, colorScheme} : CommonStaticElementProps) {
  const { toggleColorScheme } = useColorScheme();
  return (
    <View className="root-header" >
      <Image
        source={colorScheme === "dark" ? Images.logo_white : Images.logo_black}
        className=" basis-2/12"
        resizeMode="contain"
      />
      <SearchBar
        placeholder="Keresés"
        colorScheme={colorScheme}
        onSearch={(query) => {
          console.log(query);
        }}
      />
      <Button
        onPress={() => toggleColorScheme()}
        className="h-12 w-12 text-center flex justify-center items-center p-1 rounded-xl secondary"
      >
        <MaterialCommunityIcons
          name="chat-outline"
          size={32}
          color={colorScheme === "light" ? "black" : "white"}
        />
      </Button>
    </View>
  );
}
