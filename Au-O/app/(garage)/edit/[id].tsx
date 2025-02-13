import { Alert, Image, Keyboard, Pressable, ScrollView, View } from "react-native";
import Input from "@/components/ui/Input";
import { useColorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import { Images } from "@/lib/staticAssetExports";
import GarageItem from "@/components/garage/GarageItem";
import ThemedText from "@/components/ui/ThemedText";
import { useEffect, useState } from "react";
import { Car, CarType } from "@/constants/types";
import { CarCreationRequest } from "@/constants/types";
import SheetSelection, {
  SheetSelectionRef,
} from "@/components/ui/SheetSelection";
import CarTypeListItem from "@/components/garage/CarTypeListItem";
import Button from "@/components/ui/Button";
import { useRef } from "react";
import CollapsibleText from "@/components/ui/CollapsibleText";
import { addCar, deleteCar, editCar, getCarByCarId } from "@/lib/apiClient";
import Toast from "react-native-toast-message";
import LoadingModal from "@/components/ui/LoadingModal";
import { router, useLocalSearchParams } from "expo-router";
export default function editCarPage() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  const { id } = useLocalSearchParams();
  const [savedCar, setSavedCar] = useState<Car | undefined>(undefined);
  const [editCarForm, setEditCarForm] = useState<CarCreationRequest>({
    manufacturer: "",
    description: "",
    displacement: 0,
    horsepower: 0,
    model: "",
    type: "SEDAN",
  });
  const sheet = useRef<SheetSelectionRef>(null);
  async function getPrevCar() {
    const res = await getCarByCarId(id as string);
    if (res) {
      setSavedCar(res);
      setEditCarForm({
        manufacturer: res.manufacturer,
        description: res.description,
        displacement: res.displacement,
        horsepower: res.horsepower,
        model: res.model,
        type: res.type,
      });
    }
  }
  useEffect(() => {
    getPrevCar();
  }, []);
  if (savedCar === undefined)
    return <LoadingModal colorScheme={colorScheme!} loading />;
  return (
    <ScrollView className="background">
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
                editCarForm.displacement === 0 ? 1.2 : editCarForm.displacement,
              manufacturer:
                editCarForm.manufacturer === ""
                  ? "Preview"
                  : editCarForm.manufacturer,
              model:
                editCarForm.model === "" ? "Placeholder" : editCarForm.model,
              horsepower:
                editCarForm.horsepower === 0 ? 123 : editCarForm.horsepower,
              id: "1",
              type: editCarForm.type,
            }}
            colorScheme={colorScheme!}
            language={language}
            onSelect={() => {}}
            onPress={() => {}}
          />
          <CollapsibleText className="text-lg leading-tight mx-2">
            {editCarForm.description}
          </CollapsibleText>
        </View>
        <Input
          label="Manufacturer"
          icon="wrench-outline"
          TextInputProps={{
            placeholder: "Toyota",
            value: editCarForm.manufacturer,
            onChangeText: (text) =>
              setEditCarForm({ ...editCarForm, manufacturer: text }),
          }}
          colorScheme={colorScheme!}
        />
        <Input
          label="Model"
          icon="car-outline"
          TextInputProps={{
            placeholder: "Celica",
            value: editCarForm.model,
            onChangeText: (text) =>
              setEditCarForm({ ...editCarForm, model: text }),
          }}
          colorScheme={colorScheme!}
        />
        <Input
          label="Description"
          icon="pencil-outline"
          TextInputProps={{
            placeholder: "My favorite weekend car",
            multiline: true,
            value: editCarForm.description,
            numberOfLines: 4,
            onChangeText: (text) =>
              setEditCarForm({ ...editCarForm, description: text }),
          }}
          colorScheme={colorScheme!}
        />
        <SheetSelection
          colorScheme={colorScheme!}
          ref={sheet}
          placeholder={
            typeof editCarForm.type === "string" ? editCarForm.type : "SEDAN"
          }
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
                onPress={() => {
                  sheet.current?.dismissSheet();
                  setEditCarForm({
                    ...editCarForm,
                    type: item as CarType,
                  });
                }}
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
                keyboardType: "number-pad",
                value: editCarForm.horsepower.toString(),
                onChangeText: (text) =>
                  setEditCarForm({
                    ...editCarForm,
                    horsepower: parseInt(text),
                  }),
              }}
            />
          </View>
          <View className="basis-1/2">
            <Input
              colorScheme={colorScheme!}
              label="Displacement"
              icon="engine-outline"
              TextInputProps={{
                placeholder: "2.0",
                value: editCarForm.displacement.toString(),
                onChangeText: (text) =>
                  setEditCarForm({
                    ...editCarForm,
                    displacement: parseFloat(text.replace(",", ".")),
                  }),
                keyboardType: "decimal-pad",
              }}
            />
          </View>
        </View>
        <Button
          onPress={async () => {
            const res = await editCar(id as string, {
                description: editCarForm.description,
                displacement: editCarForm.displacement,
                horsepower: editCarForm.horsepower,
                manufacturer: editCarForm.manufacturer,
                model: editCarForm.model,
                type: editCarForm.type,

            });
            if (res) {
              Toast.show({
                type: "success",
                text1: "Car added",
                text2: "Your car has been added to the garage",
              });
            }
          }}
          innerTextClassName="text-xl font-bold"
          className="button highlight btn-fill"
        >
          Save
        </Button>
        <View className="w-10/12 my-3 justify-between flex mx-auto flex-row gap-2 ">
          <Button
            onPress={async () => {
             Alert.alert("Are you sure you want to discard changes?", "", [
                {
                    "text": "Keep Editing",
                    onPress: () => {return},
                    isPreferred: true
                },
                {
                    "text": "Discard Changes",
                    onPress: () => {router.back()},
                    isPreferred: false,
                    style: "destructive"
                }
            ])}}
          >
            Cancel Edit
          </Button>
          <Button
            onPress={async () => {
             Alert.alert("Are you sure you want to delete this car?", "This cannot be undone.", [
                {
                    "text": "Keep Car",
                    onPress: () => {return},
                    isPreferred: true
                },
                {
                    "text": "Delete Car",
                    onPress: async () => {
                      const res = await deleteCar(id as string);
                      if (res) {
                        Toast.show({
                          type: "success",
                          text1: "Car deleted",
                          text2: "Your car has been removed from the garage",
                        });
                      }
                    },
                    isPreferred: false,
                    style: "destructive"
                }
             ])
            }}
          >
            Delete Car
          </Button>
        </View>
      </Pressable>
    </ScrollView>
  );
}
