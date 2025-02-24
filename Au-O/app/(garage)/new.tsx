import { Image, Keyboard, Pressable, ScrollView, View } from 'react-native';
import Input from '@/components/ui/Input';
import { useColorScheme } from 'nativewind';
import { useLanguage } from '@/contexts/LanguageContext';
import { Images } from '@/lib/staticAssetExports';
import GarageItem from '@/components/garage/list/GarageItem';
import { useEffect, useState } from 'react';
import { CarType } from '@/constants/types';
// import { CarCreationRequest } from "@/constants/types";

import SheetSelection, { SheetSelectionRef } from '@/components/ui/SheetSelection';
import CarTypeListItem from '@/components/garage/list/CarTypeListItem';
import Button from '@/components/ui/Button';
import { useRef } from 'react';
import CollapsibleText from '@/components/ui/CollapsibleText';
// import { addCar } from "@/lib/apiClient";
import Toast from 'react-native-toast-message';
import { SocialTexts } from '@/constants/texts';
import { router } from 'expo-router';
import { CarCreationRequest } from '@/lib/request/CarCreationRequest';
import { addCar } from '@/lib/ApiCalls/CarApiCalls';
export default function newCar() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  const [displacement, setDisplacement] = useState('');
  const [newCarForm, setNewCarForm] = useState<CarCreationRequest>({
    manufacturer: '',
    description: '',
    displacement: 0,
    horsepower: 0,
    model: '',
    type: 'SEDAN',
    productionYear: 1900,
  });
  useEffect(() => {
    setNewCarForm({
      ...newCarForm,
      displacement: parseFloat(displacement.replace(',', '.')),
    });
  }, [displacement]);
  const sheet = useRef<SheetSelectionRef>(null);
  const handleDisplacementChange = (text: string) => {
    setDisplacement(text);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never" bounces={false} className="background">
      <View className="w-full justify-evenly flex flex-col pt-safe-offset-1 secondary">
        <Image
          source={colorScheme === 'light' ? Images.logo_black : Images.logo_white}
          className=" h-8 m-auto mb-2"
          resizeMode="contain"
        />
      </View>
      <Pressable className="flex h-screen flex-col" onPress={() => Keyboard.dismiss()}>
        <View>
          <GarageItem
            isOwner={false}
            car={{
              productionYear: newCarForm.productionYear > 1900 ? newCarForm.productionYear : 1990,
              description: 'PLACEHOLDER',
              displacement: !newCarForm.displacement ? 12 : newCarForm.displacement * 10,
              manufacturer: newCarForm.manufacturer === '' ? 'Preview' : newCarForm.manufacturer,
              model: newCarForm.model === '' ? 'Placeholder' : newCarForm.model,
              horsepower: newCarForm.horsepower === 0 ? 123 : newCarForm.horsepower,
              id: 0,
              type: newCarForm.type,
            }}
            colorScheme={colorScheme!}
            language={language}
            onSelect={() => {}}
            onPress={() => {}}
          />
          <CollapsibleText className="text-lg leading-tight mx-2">{newCarForm.description}</CollapsibleText>
        </View>
        <Input
          label={SocialTexts.creation.car.manufacturer[language]}
          icon="wrench-outline"
          TextInputProps={{
            placeholder: 'Toyota',
            value: newCarForm.manufacturer,
            onChangeText: (text) => setNewCarForm({ ...newCarForm, manufacturer: text }),
          }}
          colorScheme={colorScheme!}
        />
        <Input
          label={SocialTexts.creation.car.model[language]}
          icon="car-outline"
          TextInputProps={{
            placeholder: 'Celica',
            value: newCarForm.model,
            onChangeText: (text) => setNewCarForm({ ...newCarForm, model: text }),
          }}
          colorScheme={colorScheme!}
        />
        <Input
          label={SocialTexts.creation.car.description[language]}
          icon="pencil-outline"
          TextInputProps={{
            placeholder: SocialTexts.creation.car.placeholders.description[language],
            multiline: true,
            numberOfLines: 4,
            value: newCarForm.description,
            onChangeText: (text) => setNewCarForm({ ...newCarForm, description: text }),
          }}
          colorScheme={colorScheme!}
        />
        <Input
          colorScheme={colorScheme!}
          label={SocialTexts.creation.car.year[language]}
          icon="calendar-outline"
          TextInputProps={{
            value: newCarForm.productionYear === 1900 ? '' : newCarForm.productionYear.toString(),
            placeholder: '1990',
            onChangeText: (text) =>
              setNewCarForm({
                ...newCarForm,
                productionYear: !parseInt(text) ? 0 : parseInt(text),
              }),
            keyboardType: 'number-pad',
          }}
        />
        <SheetSelection
          colorScheme={colorScheme!}
          ref={sheet}
          placeholder={typeof newCarForm.type === 'string' ? newCarForm.type : 'SEDAN'}
          language={language}
          FlashListProps={{
            data: ['SEDAN', 'COUPE', 'GRANDCOUPE', 'HATCH', 'KOMBI', 'CABRIOLET', 'PICKUP', 'ROADSTER', 'SUV'],
            renderItem: ({ item }) => (
              <CarTypeListItem
                onPress={() => {
                  sheet.current?.dismissSheet();
                  setNewCarForm({
                    ...newCarForm,
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
                placeholder: '123',
                value: newCarForm.horsepower + '',
                keyboardType: 'number-pad',
                onChangeText: (text) => {
                  setNewCarForm({ ...newCarForm, horsepower: !parseInt(text) ? 0 : parseInt(text) });
                },
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
                placeholder: '2.0',
                onChangeText: handleDisplacementChange,

                keyboardType: 'decimal-pad',
              }}
            />
          </View>
        </View>

        <Button
          onPress={async () => {
            const res = await addCar({
              ...newCarForm,
              displacement: parseFloat(displacement.replace(',', '.')) * 10,
            });
            if (res) {
              Toast.show({
                type: 'success',
                text1: SocialTexts.creation.car.added.header[language],
                text2: SocialTexts.creation.car.added.body[language],
              });
              router.replace('/(root)/home');
              router.push({ pathname: '/(garage)/[id]', params: { id: res.id } });
            }
          }}
          innerTextClassName="text-xl font-bold"
          className="button highlight btn-fill"
        >
          {SocialTexts.creation.car.save[language]}
        </Button>
      </Pressable>
    </ScrollView>
  );
}
