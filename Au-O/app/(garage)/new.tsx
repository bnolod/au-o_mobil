import { Image, Keyboard, Pressable, ScrollView, View } from "react-native";
import Input from "@/components/ui/Input";
import { useColorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import { Images } from "@/lib/staticAssetExports";
import GarageItem from "@/components/garage/GarageItem";
import { useState } from "react";
import { CarType } from "@/constants/types";
import { CarCreationRequest } from "@/constants/types";
import SheetSelection, { SheetSelectionRef } from "@/components/ui/SheetSelection";
import CarTypeListItem from "@/components/garage/CarTypeListItem";
import Button from "@/components/ui/Button";
import { useRef } from "react";
import CollapsibleText from "@/components/ui/CollapsibleText";
import { addCar } from "@/lib/apiClient";
import Toast from "react-native-toast-message";
export default function newCar() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  const [newCarForm, setNewCarForm] = useState<CarCreationRequest>({
    manufacturer: "",
    description: "",
    displacement: 0,
    horsepower: 0,
    model: "",
    type: "SEDAN",
  });
  const sheet = useRef<SheetSelectionRef>(null)
  return (

    <ScrollView  showsVerticalScrollIndicator={false} overScrollMode="never"  bounces={false} className="background">
      <View className="w-full justify-evenly flex flex-col pt-safe-offset-1 secondary">
        <Image
          source={
            colorScheme === "light" ? Images.logo_black : Images.logo_white
          }
          className=" h-8 m-auto mb-2"
          resizeMode="contain"
        />
      </View>
      <Pressable
        className="flex h-screen flex-col"
        onPress={() => Keyboard.dismiss()}
      >
        <View>
          <GarageItem
            car={{
              description: "PLACEHOLDER",
              displacement:
                newCarForm.displacement === 0 ? 1.2 : newCarForm.displacement,
              manufacturer:
                newCarForm.manufacturer === ""
                  ? "Preview"
                  : newCarForm.manufacturer,
              model: newCarForm.model === "" ? "Placeholder" : newCarForm.model,
              horsepower:
                newCarForm.horsepower === 0 ? 123 : newCarForm.horsepower,
              id: "1",
              type: newCarForm.type,
            }}
            colorScheme={colorScheme!}
            language={language}
            onSelect={() => {}}
            onPress={() => {}}
          />
          <CollapsibleText className="text-lg leading-tight mx-2">
            {newCarForm.description}
          </CollapsibleText>
        </View>
        <Input
          label="Manufacturer"
          icon="wrench-outline"
          TextInputProps={{
            placeholder: "Toyota",
            value: newCarForm.manufacturer,
            onChangeText: (text) =>
              setNewCarForm({ ...newCarForm, manufacturer: text }),
          }}
          colorScheme={colorScheme!}
        />
        <Input
          label="Model"
          icon="car-outline"
          TextInputProps={{
            placeholder: "Celica",
            value: newCarForm.model,
            onChangeText: (text) =>
              setNewCarForm({ ...newCarForm, model: text }),
          }}
          colorScheme={colorScheme!}
        />
        <Input
          label="Description"
          icon="pencil-outline"
          TextInputProps={{
            placeholder: "My favorite weekend car",
            multiline: true,
            numberOfLines: 4,
            value: newCarForm.description,
            onChangeText: (text) =>
              setNewCarForm({ ...newCarForm, description: text }),
          }}
          colorScheme={colorScheme!}
        />
        <SheetSelection
          colorScheme={colorScheme!}
          ref={sheet}
          placeholder={typeof newCarForm.type === "string" ? newCarForm.type : "SEDAN"}
          language={language}
          FlashListProps={{
            
            data: [
              "SEDAN",
              "COUPE",
              "GRANDCOUPE",
              "HATCH",
              "KOMBI",
              "CABRIOLET",
              "PICKUP",
              "ROADSTER",
              "SUV",
            ],
            renderItem: ({ item }) => (
              <CarTypeListItem
                onPress={() =>
                {
                  sheet.current?.dismissSheet()
                  setNewCarForm({
                    ...newCarForm,
                    type: item as CarType,
                  })
                }
              }
colorScheme={colorScheme!}
                type={item as CarType}
              />
            ),
          }}
        />
        <View className="w-11/12 mx-auto flex flex-row gap-2 ">
          <View className="basis-1/2">
            <Input
              colorScheme={colorScheme!}
              label="Horsepower"
              icon="speedometer"
              TextInputProps={{
                placeholder: "123",
                value: newCarForm.horsepower.toString(),
                keyboardType: "number-pad",
                onChangeText: (text) =>
                  setNewCarForm({ ...newCarForm, horsepower: parseInt(text) }),
              }}
            />
          </View>
          <View className="basis-1/2">
            <Input
              colorScheme={colorScheme!}
              label="Displacement"
              icon="engine-outline"
              TextInputProps={{
                value: newCarForm.displacement.toString(),
                placeholder: "2.0",
                onChangeText: (text) =>
                  setNewCarForm({
                    ...newCarForm,
                    displacement: parseFloat(text.replace(",", ".")),
                  }),
                keyboardType: "decimal-pad",
              
              }}
            />
          </View>
        </View>
      <Button onPress={async () => {
        const res = await addCar(newCarForm)
        if (res) {
          Toast.show({
            type: "success",
            text1: "Car added",
            text2: "Your car has been added to the garage",
          })
        }
      }} innerTextClassName="text-xl font-bold" className="button highlight btn-fill">
              Save
      </Button>
      </Pressable>
    </ScrollView>
  );
}
