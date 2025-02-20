import {
  Alert,
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  View,
} from "react-native";
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
import { SocialTexts } from "@/constants/texts";
export default function editCarPage() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  const { id } = useLocalSearchParams();
  const [savedCar, setSavedCar] = useState<Car | undefined>(undefined);
  const [displacement, setDisplacement] = useState<string>();
  const [editCarForm, setEditCarForm] = useState<CarCreationRequest>({
    manufacturer: "",
    description: "",
    productionYear: 0,
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
      setDisplacement((res.displacement/10).toString());
      setEditCarForm({
        manufacturer: res.manufacturer,
        description: res.description,
        productionYear: res.productionYear,
        displacement: res.displacement/10,
        horsepower: res.horsepower,
        model: res.model,
        type: res.type,
      });
    }
  }
  useEffect(() => {
    getPrevCar();
  }, []);
  useEffect(() => {
    setEditCarForm({
      ...editCarForm,
      displacement:  displacement ? parseFloat(displacement.replace(",", ".")) : 0,
    })
  }, [displacement])
  if (savedCar === undefined)
    return <LoadingModal colorScheme={colorScheme!} loading />;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      bounces={false}
      className="background"
    >
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
                editCarForm.displacement === 0 ? 12 : editCarForm.displacement * 10,
              manufacturer:
                editCarForm.manufacturer === ""
                  ? "Preview"
                  : editCarForm.manufacturer,
              model:
                editCarForm.model === "" ? "Placeholder" : editCarForm.model,
              horsepower:
                editCarForm.horsepower === 0 ? 123 : editCarForm.horsepower,
              id: 0,
              type: editCarForm.type,

              productionYear:
                editCarForm.productionYear > 0
                  ? editCarForm.productionYear
                  : new Date().getFullYear(),
            }}
            isOwner
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
          label={SocialTexts.creation.car.manufacturer[language]}
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
          label={SocialTexts.creation.car.model[language]}
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
          label={SocialTexts.creation.car.description[language]}
          icon="pencil-outline"
          TextInputProps={{
            placeholder: SocialTexts.creation.car.placeholders.description[language],
            multiline: true,
            value: editCarForm.description,
            numberOfLines: 4,
            onChangeText: (text) =>
              setEditCarForm({ ...editCarForm, description: text }),
          }}
          colorScheme={colorScheme!}
        />
        <Input
          label={SocialTexts.creation.car.year[language]}
          icon="calendar-outline"
          TextInputProps={{
            placeholder: "1990",
            value: editCarForm.productionYear
              ? editCarForm.productionYear.toString()
              : "2020",
            maxLength: 4,
            keyboardType: "number-pad",
            onChangeText: (text) =>
              setEditCarForm({
                ...editCarForm,
                productionYear: parseInt(text),
              }),
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
              label={SocialTexts.creation.car.horsepower[language]}
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
              label={SocialTexts.creation.car.displacement[language]}
              icon="engine-outline"
              TextInputProps={{
                 

                value: displacement,
                placeholder: "2.0",
                onChangeText: (text) => {
                  setDisplacement(text);
                },
                keyboardType: "decimal-pad",
              }}
            />
          </View>
        </View>
        <Button
          className="button outline btn-fill btn-highlight"
          onPress={async () => {
            const res = await editCar(id as string, {
              description: editCarForm.description,
              displacement: displacement ? parseFloat(displacement.replace(",", ".")) * 10 : 1,
              horsepower: editCarForm.horsepower,
              manufacturer: editCarForm.manufacturer,
              model: editCarForm.model,
              type: editCarForm.type,
              productionYear: editCarForm.productionYear,
            });
            if (res) {
              Toast.show({
                type: "success",
                text1: SocialTexts.creation.car.edited.header[language],
                text2: SocialTexts.creation.car.edited.body[language],
              });
              router.replace("/(root)/home")
              router.push({pathname: "/(garage)/[id]", params: {id: savedCar.id}})
            }
          }}
          innerTextClassName="text-xl font-bold"
        >
          {SocialTexts.creation.car.save[language]}
        </Button>
        <View className="w-10/12 my-3 justify-between flex mx-auto flex-row gap-2 ">
          <Button
            className="button outline btn-highlight"
            onPress={async () => {
              Alert.alert(SocialTexts.creation.car.prompts.discard[language], "", [
                {
                  text: SocialTexts.creation.car.prompts.discardTexts.cancel[language],
                  onPress: () => {
                    return;
                  },
                  isPreferred: true,
                },
                {
                  text: SocialTexts.creation.car.prompts.discardTexts.confirm[language],
                  onPress: () => {
                    router.back();
                  },
                  isPreferred: false,
                  style: "destructive",
                },
              ]);
            }}
          >
            {SocialTexts.creation.car.prompts.cancel[language]}
          </Button>
          <Button
            className="button border-2 border-highlight"
            onPress={async () => {
              Alert.alert(
                SocialTexts.creation.car.prompts.delete.header[language],
                SocialTexts.creation.car.prompts.delete.body[language],
                
                [
                  {
                    text: SocialTexts.creation.car.prompts.delete.buttons.cancel[language],
                    onPress: () => {
                      return;
                    },
                    isPreferred: true,
                  },
                  {
                    text: SocialTexts.creation.car.prompts.delete.buttons.delete[language],
                    onPress: async () => {
                      const res = await deleteCar(id as string);
                      if (res) {
                        Toast.show({
                          type: "success",
                          text1: SocialTexts.creation.car.deleted.header[language],
                          text2: SocialTexts.creation.car.deleted.body[language],
                        });
                        router.back()
                      }
                    },
                    isPreferred: false,
                    style: "destructive",
                  },
                ]
              );
            }}
          >
            {SocialTexts.creation.car.deleted.button[language]}
          </Button>
        </View>
      </Pressable>
    </ScrollView>
  );
}
