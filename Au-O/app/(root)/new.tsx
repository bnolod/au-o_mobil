import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ThemedText from '@/components/ui/ThemedText';
import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/contexts/LanguageContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useRef } from 'react';
import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';
import { Images } from '@/lib/staticAssetExports';
import * as ImagePicker from 'expo-image-picker';
import Carousel from 'react-native-reanimated-carousel';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { PostCreationTexts } from '@/constants/texts';
import ImageNotFound from '@/components/Post/base/ImageNotFound';
import {Image, ImageBackground} from 'expo-image'
import PostCard from '@/components/Post/Post';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import {
  cleanupInvalidImageUploads,
  createImageForm,
  handleGallery,
  searchFilter,
} from '@/lib/functions';
import Toast from 'react-native-toast-message';
import LoadingModal from '@/components/ui/LoadingModal';
import { router } from 'expo-router';
import SheetSelection, { SheetSelectionRef } from '@/components/ui/SheetSelection';
import FilterBar from '@/components/ui/FilterBar';
import GarageItem from '@/components/garage/list/GarageItem';
import { getCarImage } from '@/components/graphics/cars';
import { Car } from '@/lib/entity/Car';
import { getOwnGarage } from '@/lib/ApiCalls/CarApiCalls';
import { SocialEvent } from '@/lib/entity/SocialEvent';
import { imageUpload } from '@/lib/ApiCalls/ImageApiCalls';
import { publishPost } from '@/lib/ApiCalls/PostApiCalls';
import PostCreationSheetSelectElements from '@/components/Post/NewPost/PostCreationSheetSelectElement';
import { CreatePostRequest } from '@/lib/request/PostCreationRequest';
import { ImageStoreRequest, ImageUploadResponse } from '@/lib/request/ImgurRequest';
export default function NewPost() {
  const { language } = useLanguage();
  const { user } = useAuthentication();
  const { colorScheme } = useColorScheme();

  const sheet = useRef<SheetSelectionRef>(null);
  const eventSheet = useRef<SheetSelectionRef>(null);

  const [selectedEvent, setSelectedEvent] = useState<SocialEvent | null>(null);
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState<Car | null>();
  const [newPostForm, setNewPostForm] = useState<CreatePostRequest>({
    description: '',
    location: '',
    userId: user!.id,
    groupId: null,
    eventId: null,
    images: images,
    vehicleId: null,
  });
  const [cars, setCars] = useState<Car[]>([]);
  const [vehicleSearch, setVehicleSearch] = useState<string>("");
  useEffect(() => {
    getCars();
  }, []);
  useEffect(() => {
    setNewPostForm({
      ...newPostForm,
      eventId: selectedEvent ? selectedEvent.id : null,
      images: images,
    });
  }, [images, selectedEvent]);
  function handlePresent() {
    bottomSheetRef.current?.present();
  }
  async function getCars() {
    const res = await getOwnGarage();
    if (res) {
      setCars(res);
    }
  }

  async function handleSubmit() {
    setLoading(true);
    const uploadedImages: ImageUploadResponse[] = [];
    for (const image of images) {
      const res = await createImageForm(image, newPostForm.description, user!);
      if (res) {
        const upload = await imageUpload(res);
        if (upload) {
          uploadedImages.push(upload);
        }
      }
    }
    setLoading(false);

    if (uploadedImages.length === images.length) {
      const imageStoreRequest: ImageStoreRequest = {
        text: newPostForm.description || '',
        location: newPostForm.location || '',
        postImages: uploadedImages,
        vehicleId: newPostForm.vehicleId,
      };
      const storeRes = await publishPost(imageStoreRequest);
      bottomSheetRef.current?.dismiss();
      setNewPostForm({
        description: '',
        location: '',
        userId: user!.id,
        groupId: null,
        eventId: selectedEvent ? selectedEvent.id : null,
        images: [],
        vehicleId: null,
      });
      setLoading(false);
      if (storeRes) {
        Toast.show({
          type: 'success',
          text1: PostCreationTexts.imageUploadSuccessToast.header[language],
          text2: PostCreationTexts.imageUploadSuccessToast.message[language],
        });
        setImages([]);
        router.replace('/(root)/home');
        router.push({
          pathname: '/(post)/page/[id]',
          params: { id: storeRes.postId as string, isNew: 'true' },
        });
      } else {
        Toast.show({
          type: 'error',
          text1: PostCreationTexts.imageUploadErrorAlert[language],
        });
      }
    } else {
      cleanupInvalidImageUploads(uploadedImages);
      Toast.show({
        type: 'error',
        text1: 'Some images failed to upload (' + uploadedImages.length + '/' + images.length + ')',
      });
      return;
    }
  }

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  if (user === undefined) return <LoadingModal loading={true} colorScheme={colorScheme!} />;
  return (
    <>
      <LoadingModal loading={loading} colorScheme={colorScheme!} text="Posting.." />
      <View className="w-full pt-safe-offset-2 secondary">
        <Image
          source={colorScheme === 'dark' ? Images.logo_white : Images.logo_black}
          className="h-8 mx-auto my-4"
          style={{ margin: 'auto', height: 32, width: 96, marginBottom: 8 }}
          contentFit='contain'
        />
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          
          contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors[colorScheme!].primary }}
          overScrollMode="never"
          bounces={false}
          className="primary rounded"
          
        >
          <Pressable onPress={() => Keyboard.dismiss()} className="flex flex-1 flex-col">
            <View className="h-64 basis-3/12 w-full secondary rounded-b-xl">
              {images.length > 0 ? (
                <Carousel
                  width={Dimensions.get('screen').width}
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
                        <MaterialCommunityIcons name="close" size={46} color={Colors[colorScheme!].text} />
                      </TouchableOpacity>
                      <Image source={{ uri: images[index].uri }} contentFit='contain' style={{width: "auto", height: "100%"}} className="h-full" />
                    </View>
                  )}
                />
              ) : (
                <ImageNotFound
                  onPress={async () => {
                    const res = await handleGallery(images, language);
                    setImages((res as ImagePicker.ImagePickerAsset[]) || []);
                  }}
                  language={language}
                  colorScheme={colorScheme!}
                />
              )}
            </View>
            <TouchableOpacity
              onPress={async () => {
                const res = await handleGallery(images, language);
                setImages((res as ImagePicker.ImagePickerAsset[]) || []);
              }}
              className="new-post-gallery-opener mx-auto"
            >
              <View className="absolute -left-4">
                <MaterialCommunityIcons name="image-outline" color={Colors[colorScheme!].text} size={36} />
              </View>
              <ThemedText className="txl">{PostCreationTexts.upload[language]}</ThemedText>
              <ThemedText className="tlg flex items-center">
                {images.length || 0} {PostCreationTexts.selectedImages[language]}
              </ThemedText>
            </TouchableOpacity>
            {images.length > 0 && (
              <TouchableOpacity className="mx-auto my-2" onPress={() => setImages([])}>
                <ThemedText className="font-semibold underline">{PostCreationTexts.clearImages[language]}</ThemedText>
              </TouchableOpacity>
            )}
            <View className=" w-full">
              <View className="w-full flex flex-col justify-center items-center">
                <Input
                  label={PostCreationTexts.form.description.label[language]}
                  icon="pencil"
                  size={28}
                  TextInputProps={{
                    placeholder: PostCreationTexts.form.description.placeholder[language],
                    multiline: true,
                    numberOfLines: 4,
                    style: { maxHeight: 100 },
                    onChangeText: (text) => {
                      setNewPostForm({ ...newPostForm, description: text });
                    },
                  }}
                  colorScheme={colorScheme!}
                  containerClassName="rounded-xl"
                />
                  <View className="w-11/12 mb-4">
                    <ThemedText className="text-lg">
                      <MaterialCommunityIcons name="calendar-account-outline" size={19} />{' '}
                      {PostCreationTexts.form.event[language]}
                    </ThemedText>

                    <SheetSelection
                      colorScheme={colorScheme!}
                      placeholder="Select an event"
                      language={language}
                      FlashListProps={{
                        data: [{ title: 'Event 1', date: '2022.12.12' }],
                        renderItem: ({ item, index }) => (
                          <PostCreationSheetSelectElements
                            onPress={() => console.log(item.title)}
                            event={{ title: item.title }}
                            title={item.title}
                          />
                        ),
                        estimatedItemSize: 50,
                        ListHeaderComponent: () => (
                          <FilterBar placeholder="Search events" onChange={(text: string) => {}} />
                        ),
                      }}
                    />
                  </View>
                </View>
                <View className='w-11/12 mb-4 mx-auto'>
                <ThemedText className="text-lg">
                      <MaterialCommunityIcons name="car-outline" size={19} />{' '}
                      {PostCreationTexts.form.vehicle[language]}
                    </ThemedText>
                <SheetSelection
                  ref={sheet}

                  placeholder={
                    <View className="flex flex-row items-center">
                      {car && getCarImage(car.type, colorScheme!, 90, 52, 3.3)}
                      <ThemedText className="tlg">
                        {car ? car.manufacturer + ' ' + car.model : 'Select a vehicle'}
                      </ThemedText>
                    </View>
                  }
                  language={language}
                  colorScheme={colorScheme!}
                  FlashListProps={{
                    data: cars,
                    estimatedItemSize: 120,
                    ListHeaderComponent: () => (
                      <View>
                        <Button
                          onPress={() => sheet.current?.dismissSheet()}
                          className="button btn-fill highlight-themed outline"
                          >
                          Close
                        </Button>
                        <Pressable
                          className="w-11/12 my-2 mx-auto rounded-l overflow-hidden flex justify-center items-center"
                          onPress={() => {
                            sheet.current?.dismissSheet();
                            setCar(null);
                            setNewPostForm({
                              ...newPostForm,
                              vehicleId: null,
                            });
                          }}
                          >
                          <ImageBackground
                          style={{width: "100%", borderRadius: 12, backgroundColor: Colors[colorScheme!].secondary} }
                            source={Images.banner_placeholder}
                            >
                            <ThemedText className="font-bold w-full mx-auto text-center text-lg p-3 rounded-xl">
                              Unassign vehicle
                            </ThemedText>
                          </ImageBackground>
                        </Pressable>
                      </View>
                    ),
                    renderItem: ({ item }) => (

                      <Pressable
                      onPress={() => {
                          sheet.current?.dismissSheet();
                          setCar(item);
                          setNewPostForm({
                            ...newPostForm,
                            vehicleId: item.id,
                          });
                        }}
                      >
                        <View className="pointer-events-none">
                          <GarageItem isOwner={true} colorScheme={colorScheme!} language={language} car={item} />
                        </View>
                      </Pressable>
                    ),
                  }}
                  />
                  </View>
                <Input
                  label={PostCreationTexts.form.location.label[language]}
                  icon={'map-marker-outline'}
                  size={28}
                  TextInputProps={{
                    placeholder: PostCreationTexts.form.location.placeholder[language],
                    onChangeText: (text) => {
                      setNewPostForm({ ...newPostForm, location: text });
                    },
                  }}
                  colorScheme={colorScheme!}
                  containerClassName="rounded-xl"
                />
                <Button
                  className="highlight button btn-fill"
                  innerTextClassName="tlg"
                  type="fill"
                  style={{ marginTop: 20 }}
                  hapticFeedback="light"
                  onPress={() => {
                    images.length > 0
                      ? handlePresent()
                      : Alert.alert(
                          PostCreationTexts.noImageFoundAlert[language],
                          PostCreationTexts.noImageFoundAlertMessage[language],
                          [],
                          {
                            userInterfaceStyle: colorScheme,
                            cancelable: true,
                          }
                        );
                  }}
                >
                  {PostCreationTexts.form.next[language]}
                </Button>
            </View>
            <View className="w-full mb-4">
              <BottomSheetModal
                ref={bottomSheetRef}
                enablePanDownToClose={true}
                backgroundStyle={{
                  backgroundColor: Colors[colorScheme!].secondary,
                }}
                snapPoints={['90%', '95%']}
                handleIndicatorStyle={{
                  backgroundColor: Colors[colorScheme!].text,
                  width: '33%',
                  height: 5,
                }}
                handleStyle={{
                  backgroundColor: Colors[colorScheme!].secondary,

                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}
                index={1}
              >
                <BottomSheetView>
                  <PostCard
                    user={user!}
                    reaction={'FIRE'}
                    postId={null}
                    authorProfileImg={user!.profileImg}
                    authorId={null}
                    authorNickname={user!.nickname}
                    vehicle={car ? car : null}
                    authorUsername={user!.username}
                    colorScheme={colorScheme!}
                    date={new Date().toDateString()}
                    description={newPostForm.description}
                    images={images.map((image) => {
                      return { url: image.uri, deleteHash: '' };
                    })}
                    language={language}
                    location={newPostForm.location}
                    comments={[]}
                    preview
                    reactions={{ FIRE: 432, HEART: 1, COOL: 0 }}
                    event={
                 null
                    }
                    group={null}
                  />
                  <Button
                    onPress={handleSubmit}
                    innerTextClassName="txl"
                    className=" my-2 p-2 highlight button btn-fill"
                  >
                    {PostCreationTexts.buttons.post[language]}
                  </Button>
                  <Button
                    onPress={() => bottomSheetRef.current?.dismiss()}
                    className=" mt-4 p-1 secondary button btn-fill"
                  >
                    {PostCreationTexts.buttons.dismiss[language]}
                  </Button>
                </BottomSheetView>
              </BottomSheetModal>
            </View>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
