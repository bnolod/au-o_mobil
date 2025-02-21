import { ImageBackground, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import {CommonStaticElementProps } from "@/constants/types";
import { Images } from "@/lib/staticAssetExports";
import { Colors } from "@/constants/Colors";
import { generalTexts } from "@/constants/texts";
import { Car } from "@/lib/entity/Car";

export default function GarageHeader({
    userProfilePic,
    car,
    colorScheme,
    language,
}: {
    userProfilePic?: string;
    car: Car;
} & CommonStaticElementProps) {
    return (
        <View className="garage-header">
            {userProfilePic && (
                <ImageBackground
                    className="garage-profile-display"
                    source={{ uri: userProfilePic }}
                />
            )}
            <View
                className={`garage-profile-display-image ${
                    userProfilePic && "basis-5/12"
                } `}
                style={{
                    boxShadow: `0px 10px 50px 50px ${Colors[colorScheme].primary}`,
                }}
            >
                <ImageBackground
                    className="garage-profile-car-type-display"
                    resizeMode="cover"
                    source={Images.banner_placeholder}
                >
                    <ThemedText className="text-3xl font-bold">
                        {car.manufacturer}
                    </ThemedText>
                    <ThemedText className="txl">{car.model}</ThemedText>
                    <View>
                        <ThemedText className="text-xl">
                            {car.horsepower}{" "}
                            {
                                generalTexts.profileAttributes.cars.horsepower[
                                    language
                                ]
                            }
                        </ThemedText>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}
