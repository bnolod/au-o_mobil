import { ImageBackground, Pressable, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { CarType } from "@/constants/types";
import { Images } from "@/lib/staticAssetExports";
import { getCarImage } from "../graphics/cars";
import { Colors } from "@/constants/Colors";

export default function CarTypeListItem({onPress, type, colorScheme}: {onPress: () => void, type: CarType, colorScheme: "light" | "dark"}) {
    return (
        <Pressable onPress={onPress} style={{
            shadowColor: Colors[colorScheme].background,
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 1,
            shadowRadius:3,
        }}>
            <View  className="flex my-2 mx-2 flex-row overflow-hidden items-center rounded-xl secondary h-24">
                
                    <View className="basis-5/12 h-full overflow-hidden rounded-l-xl">
                      <ImageBackground
                        resizeMode="cover"
                        className="flex-1 flex justify-center items-center"
                        source={Images.banner_placeholder}
                        >
                          <View className="absolute">{getCarImage(type, colorScheme, 140)}</View>
                        </ImageBackground>
                    </View>
            
                    <View
                      className="flex secondary  h-full items-start justify-center flex-col gap-1"
                      style={{
                        shadowColor: Colors[colorScheme].secondary,
                        shadowOffset: {
                          width: -20,
                          height: 0,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 20,
                      }}
                    >
                      <ThemedText className="text-2xl font-bold">{type.toString()}</ThemedText>
                      
                    </View>
        </View>
        </Pressable>
        
    );
}