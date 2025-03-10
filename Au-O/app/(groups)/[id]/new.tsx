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
import ThemedText from '@/components/ui/ThemedText';
import LoadingModal from '@/components/ui/LoadingModal';
import { useColorScheme } from 'nativewind';
import { useLanguage } from '@/contexts/LanguageContext';
import { Image, ImageBackground } from 'expo-image';
import { Images } from '@/lib/staticAssetExports';
import { Colors } from '@/constants/Colors';
import Carousel from 'react-native-reanimated-carousel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ImageNotFound from '@/components/Post/base/ImageNotFound';
import { createImageForm, handleGallery } from '@/lib/functions';
import * as ImagePicker from 'expo-image-picker';
import { PostCreationTexts, SelectionTexts } from '@/constants/texts';
import Input from '@/components/ui/Input';
import SheetSelection, { SheetSelectionRef } from '@/components/ui/SheetSelection';
import PostCreationSheetSelectElements from '@/components/Post/NewPost/PostCreationSheetSelectElement';
import FilterBar from '@/components/ui/FilterBar';
import Button from '@/components/ui/Button';
import GarageItem from '@/components/garage/list/GarageItem';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import PostCard from '@/components/Post/Post';
import { useEffect, useRef, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { getCarImage } from '@/components/graphics/cars';
import { Car } from '@/lib/entity/Car';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { getOwnGarage } from '@/lib/ApiCalls/CarApiCalls';
import { Group } from '@/lib/entity/Group';
import { getGroup, postToGroup } from '@/lib/ApiCalls/GroupApiCalls';
import { validateUserPost } from '@/lib/Validation/Validation';
import { ImageUploadResponse } from '@/lib/request/ImgurRequest';
import { imageUpload } from '@/lib/ApiCalls/ImageApiCalls';
export default function NewGroupPost() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const { user } = useAuthentication();
  const [newPostForm, setNewPostForm] = useState({
    description: '',
    location: '',
    vehicleId: null,
  });
  const [car, setCar] = useState<Car | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const { id } = useLocalSearchParams();
  const sheet = useRef<SheetSelectionRef>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [group, setGroup] = useState<Group>();

  async function handleSubmit() {
    setLoading(true);
    if (!validateUserPost(newPostForm.description, newPostForm.location, images, language).valid) {
      return
    }
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
      const res = await postToGroup(Number(id), {
        location: newPostForm.location,
        text: newPostForm.description,
        vehicleId: newPostForm.vehicleId,
      postImages: uploadedImages

    });
  if (res) {
    setNewPostForm({
      description: '',
      location: '',
      vehicleId: null,
    })
    router.replace({pathname: "/(groups)/[id]/post/[postId]", params: {id: group!.id, postId: res.postId.toString()}})
  }

    setLoading(false);
  }

  function handlePresent() {
    bottomSheetRef.current?.present();
  }
  async function getCars() {
    const res = await getOwnGarage();
    if (res) {
      setCars(res);
    }
  }
  async function getGroups() {
    const res = await getGroup(id as string);
    if (res) {
      setGroup(res);
    }
  }
  useEffect(() => {
    getCars();
    getGroups();
  }, []);
  if (group && cars)
    return (
      <>
        <LoadingModal loading={loading} colorScheme={colorScheme!} text="Posting.." />
        <View className="w-full pt-safe-offset-2 secondary">
          <ThemedText  style={{boxShadow: `0px 15px 10px 3px ${Colors[colorScheme!].secondary}`}} className="text-3xl mb-3 font-black z-50 text-center">{group.alias.toUpperCase()}</ThemedText>
        </View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
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
                        <Image
                          source={{ uri: images[index].uri }}
                          contentFit="contain"
                          style={{ width: 'auto', height: '100%' }}
                          className="h-full"
                        />
                      </View>
                    )}
                  />
                ) : (
                  <ImageBackground
                    source={group.bannerImage ? { uri: group.bannerImage } : Images.banner_placeholder}
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: Colors[colorScheme!].secondary,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    imageStyle={{
                      opacity: 0.3
                    }}
                    blurRadius={group.bannerImage ? 14 : 0}
                    
                  >
                    <ImageNotFound
                      onPress={async () => {
                        const res = await handleGallery(images, language);
                        setImages((res as ImagePicker.ImagePickerAsset[]) || []);
                      }}
                      language={language}
                      colorScheme={colorScheme!}
                    />
                  </ImageBackground>
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
                      placeholder={SelectionTexts.event[language]}
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
                <View className="w-11/12 mb-4 mx-auto">
                  <ThemedText className="text-lg">
                    <MaterialCommunityIcons name="car-outline" size={19} /> {PostCreationTexts.form.vehicle[language]}
                  </ThemedText>
                  <SheetSelection
                    ref={sheet}
                    placeholder={
                      <View className="flex flex-row items-center">
                        {car && getCarImage(car.type, colorScheme!, 90, 52, 3.3)}
                        <ThemedText className="tlg">
                          {car ? car.manufacturer + ' ' + car.model : SelectionTexts.vehicle[language]}
                        </ThemedText>
                      </View>
                    }
                    language={language}
                    colorScheme={colorScheme!}
                    FlashListProps={{
                      data: cars,
                      ListHeaderComponent: () => (
                        <View>
                          <Button
                            onPress={() => sheet.current?.dismissSheet()}
                            className="button highlight-themed outline"
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
                              style={{
                                width: '100%',
                                borderRadius: 12,
                                backgroundColor: Colors[colorScheme!].secondary,
                              }}
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
                      event={null}
                      group={group}
                    />
                    <Button onPress={handleSubmit} innerTextClassName="txl" className=" my-2 p-2 highlight button btn-fill">
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
