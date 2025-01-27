import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ThemedText from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/contexts/LanguageContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React, { useRef } from "react";
import {
  ActionSheetIOS,
  Alert,
  Dimensions,
  Image,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Images } from "@/lib/staticAssetExports";
import * as ImagePicker from "expo-image-picker";
import Carousel from "react-native-reanimated-carousel";
import {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { PostCreationTexts } from "@/constants/texts";
import ImageNotFound from "@/components/new/ImageNotFound";
import PostPreview from "@/components/new/PostPreview";
export default function NewPost() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  const [selectedGroup, setSelectedGroup] = useState<string>("Public");
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("None");
  const groups = [PostCreationTexts.publicPostIndicator[language ? language : "EN"], "Civic Imádó Csoportos Indulás Közösség", "Buzik"];
  const events = [
    PostCreationTexts.noEventSpecified[language ? language : "EN"],
    "Buzi Találkozó 2024",
    "XVII. Nemzetközi Hump Day Fesztivál",
  ];
   function handlePresent() {
    bottomSheetRef.current?.present();
  }
  async function handleGallery() {
    console.log(images.length);
    if (images.length < 10) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        exif: false,
        
        quality: 0.7,
        allowsMultipleSelection: true,
        selectionLimit: 10 - images.length,
      });
      if (!result.canceled) {
        if (result.assets.length + images.length <= 10) {
        setImages(images.concat(result.assets));
      }}
    }
  }
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const openGroupSheetIOS = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [PostCreationTexts.cancel[language ? language : "EN"], ...groups],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          return;
        }
        if (buttonIndex === 1) {
          setSelectedGroup(PostCreationTexts.publicPostIndicator[language ? language : "EN"]);
        } else {
          setSelectedGroup(groups[buttonIndex - 1]);
        }
      }
    );
  };
  const openEventSheetIOS = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [PostCreationTexts.cancel[language ? language : "EN"], ...events],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          return;
        }
        if (buttonIndex === 1) {
          setSelectedEvent(PostCreationTexts.noEventSpecified[language ? language : "EN"]);
        } else {
          setSelectedEvent(events[buttonIndex - 1]);
        }
      }
    );
  };
  return (
    <>
  
      <View className="w-full sticky secondary pt-16">
        <Image
          source={colorScheme === "dark" ? Images.logo_white : Images.logo_black}
          className="h-8 mx-auto my-4"
          resizeMode="contain"
        />
      </View>
      <Pressable onPress={() => Keyboard.dismiss()} className="flex-1 flex flex-col items-center">
        <View className=" w-full basis-5/12 primary">
          {images.length > 0 ? (
            <Carousel
              width={Dimensions.get("screen").width}
              data={images}
              loop={images.length > 1}
              overscrollEnabled={false}
              renderItem={({ index }) => (
                <View>
                  <TouchableOpacity
                    className="new-post-pop-image"
                    onPress={() => {
                      setImages(images.filter((_, i) => i !== index));
                    }}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={46}
                      color={Colors[colorScheme!].text}
                    />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: images[index].uri }}
                    resizeMode="contain"
                    className="h-full"
                  />
                </View>
              )}
            />
          ) : (<ImageNotFound onPress={handleGallery} language={language} colorScheme={colorScheme!}/>
            )}
        </View>
        <TouchableOpacity
          onPress={handleGallery}
          className="new-post-gallery-opener"
        >
          <ThemedText className="text-lg">{PostCreationTexts.upload[language]}</ThemedText>
          <ThemedText className="text-sm">
            {images.length} { PostCreationTexts.selectedImages[language]}
          </ThemedText>
        </TouchableOpacity>
        {images.length > 0 && (
          <TouchableOpacity onPress={() => setImages([])}>
            <ThemedText>{PostCreationTexts.clearImages[language]}</ThemedText>
          </TouchableOpacity>
        )}
        <ScrollView>
          <View className="w-full flex flex-col justify-center items-center">
            <Input
              label={
                <ThemedText>
                  <MaterialCommunityIcons name="pencil" size={19} /> {PostCreationTexts.form.description.label[language]}
                </ThemedText>
              }
              TextInputProps={{
                placeholder: PostCreationTexts.form.description.placeholder[language],
                multiline: true,
                numberOfLines: 4,
                style: { maxHeight: 100 },
              }}
              colorScheme={colorScheme!}
              containerClassName="rounded-xl"
            />
            <View className="w-11/12 justify-between gap-2 flex flex-row  ">
              <View className=" flex-1 w-6/12 self-start">
                <ThemedText className="w-full text-lg">
                  <MaterialCommunityIcons name="account-group" size={19} />{" "}
                  {PostCreationTexts.form.group[language]}
                </ThemedText>
                {Platform.OS === "android" ? (
                  <Picker
                    selectedValue={selectedGroup}
                    onValueChange={(itemValue) => setSelectedGroup(itemValue)}
                  >
                    {groups.map((group, index) => {
                      return (
                        <Picker.Item key={index} label={group} value={index} />
                      );
                    })}
                  </Picker>
                ) : (
                  <TouchableOpacity
                    className="w-full h-14 flex justify-center secondary border-2 border-highlight rounded-xl my-2"
                    onPress={() => {
                      openGroupSheetIOS();
                    }}
                  >
                    <ThemedText className=" text-left ml-4">
                      {selectedGroup}
                    </ThemedText>
                  </TouchableOpacity>
                )}
              </View>
              <View className=" flex-1 w-6/12 self-end">
                <ThemedText className="w-11/12 text-lg">
                  <MaterialCommunityIcons
                    name="calendar-account-outline"
                    size={19}
                  />{" "}
                  {PostCreationTexts.form.event[language]}
                </ThemedText>

                {Platform.OS === "android" ? (
                  <Picker
                    selectedValue={selectedEvent}
                    onValueChange={(itemValue) => setSelectedEvent(itemValue)}
                  >
                    {events.map((event, index) => {
                      return (
                        <Picker.Item key={index} label={event} value={event} />
                      );
                    })}
                  </Picker>
                ) : (
                  <TouchableOpacity
                    className=" h-14 flex justify-center secondary border-2 border-highlight rounded-xl my-2"
                    onPress={() => {
                      openEventSheetIOS();
                    }}
                  >
                    <ThemedText className=" text-left ml-4">
                      {selectedEvent}
                    </ThemedText>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <Input
              label={
                <ThemedText>
                  <MaterialCommunityIcons name="map-marker-outline" size={19} />{" "}
                  {PostCreationTexts.form.location.label[language]}
                </ThemedText>
              }
              TextInputProps={{
                placeholder: PostCreationTexts.form.location.placeholder[language],
              }}
              colorScheme={colorScheme!}
              containerClassName="rounded-xl"
            />
          </View>
        </ScrollView>
        <View className="w-full mb-4">
          <Button
            variant="highlight"
            type="fill"
            hapticFeedback="light"
            onPress={() => {images.length > 0 ? handlePresent() : Alert.alert(PostCreationTexts.noImageFoundAlert[language], PostCreationTexts.noImageFoundAlertMessage[language], [], {
  userInterfaceStyle: colorScheme === "dark" ? "dark" : "light",            
            })}}
          >
            {PostCreationTexts.form.next[language]}
          </Button>

          <BottomSheetModal ref={bottomSheetRef}
              
              enablePanDownToClose={true}
              backgroundStyle={{
                backgroundColor: Colors[colorScheme!].secondary,
              }}
              snapPoints={["80%", "90%"]}
              handleIndicatorStyle={{
                backgroundColor: Colors[colorScheme!].text,
                width: "33%",
                height: 5,
              }}
              handleStyle={{
                backgroundColor: Colors[colorScheme!].secondary,

                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
              index={1}>
            <BottomSheetView
              
            >
              <PostPreview
              onDismiss={() => bottomSheetRef.current?.dismiss()}
                author_nickname="teszt"
                author_username="teszt"
                colorScheme={colorScheme!}
                comments={[]}
                date={new Date().toDateString()}
                description="teszt"
                image={images.length > 0 && images[0].uri}
                language={language}
                location={{
                  lat: 32,
                  lng: 32,
                }}
                reactions={{ fire: 4, heart: 6, sunglasses: 12 }}
              />
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </Pressable>
    </>
  );
}
