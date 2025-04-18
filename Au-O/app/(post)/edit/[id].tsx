import GarageItem from '@/components/garage/list/GarageItem';
import { getCarImage } from '@/components/graphics/cars';
import PostCard from '@/components/Post/Post';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingModal from '@/components/ui/LoadingModal';
import SheetSelection, { SheetSelectionRef } from '@/components/ui/SheetSelection';
import ThemedText from '@/components/ui/ThemedText';
import { Colors } from '@/constants/Colors';
import { ButtonTexts, PostCreationTexts, PostEditTexts, SelectionTexts } from '@/constants/texts';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getOwnGarage } from '@/lib/ApiCalls/CarApiCalls';
import { editPost } from '@/lib/ApiCalls/PostApiCalls';
import { apiFetch } from '@/lib/apiClient';
import { Car } from '@/lib/entity/Car';
import { Post } from '@/lib/entity/Post';
import { PostEditRequest } from '@/lib/request/PostEditRequest';
import { Images } from '@/lib/staticAssetExports';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { ImageBackground } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect, useRef, useState } from 'react';
import { Keyboard, Pressable, View } from 'react-native';

import Toast from 'react-native-toast-message';

export default function EditPost() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const sheet = useRef<SheetSelectionRef>(null);
  const [loading, setLoading] = useState<boolean | null>(true);
  const { user } = useAuthentication();
  const { language } = useLanguage();
  const { id } = useLocalSearchParams();
  const { colorScheme } = useColorScheme();
  const [post, setPost] = useState<Post>();
  const [cars, setCars] = useState<Car[]>();
  const [car, setCar] = useState<Car | null>();

  const [editPostForm, setEditPostForm] = useState<PostEditRequest>({
    description: '',
    groupData: null,
    eventData: null,
    vehicleId: null,
    location: '',
  });
  async function handleSubmit() {
    const res = await editPost(
      editPostForm.description,
      editPostForm.location,
      editPostForm.vehicleId ? editPostForm.vehicleId : null,
      id as string
    );
    if (res) {
      bottomSheetRef.current?.dismiss();
      Toast.show({
        type: 'success',
        text1: PostEditTexts.success.title[language],
        text2: PostEditTexts.success.message[language],
      });
      router.replace('/(root)/home');
      router.push({
        pathname: '/(post)/page/[id]',
        params: { id: id as string, isNew: 'true' },
      });
    } else {
      bottomSheetRef.current?.dismiss();
      Toast.show({
        type: 'error',
        text1: PostEditTexts.error.title[language],
        text2: PostEditTexts.error.message[language],
      });
    }
  }
  async function getPost() {
    const postResponse = await apiFetch<Post>(`posts/post/${id}`, 'GET', true);
    if (postResponse && postResponse.data) {
      setPost(postResponse.data);
      setEditPostForm({
        ...editPostForm,
        description: postResponse.data!.text,
        location: postResponse.data.location,
        vehicleId: postResponse.data.vehicle ? postResponse.data.vehicle.id : null,
      });
      setCar(postResponse.data.vehicle ? postResponse.data.vehicle : null);
      setLoading(false);
    } else setLoading(null);
  }
  async function getCars() {
    const res = await getOwnGarage();
    if (res) {
      setCars(res);
    }
  }
  useEffect(() => {
    getPost();
    getCars();
  }, []);
  if (loading === null) {
    return (
      <View className="flex gap-2 m-auto p-4 justify-center items-center rounded-xl bg-black/25">
        <MaterialCommunityIcons name="cloud-question" size={64} color={Colors.highlight.main} />
        <ThemedText className="text-center text-xl">{PostCreationTexts.notFound[language]}</ThemedText>
        <Button variant="highlight" onPress={() => router.back()}>
          {ButtonTexts.back[language]}
        </Button>
      </View>
    );
  }
  if (loading) {
    return <LoadingModal colorScheme={colorScheme!} loading={loading} text={PostCreationTexts.loading[language]} />;
  }
  if (post)
    return (
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
        }}
        className="flex-1 h-full justify-center items-center bg-black/25"
      >
        <View className="secondary p-4 w-11/12 rounded-xl flex gap-4">
          <ThemedText className="mx-auto text-center text-xl font-bold">{PostEditTexts.header[language]}</ThemedText>
          <Input
            colorScheme={colorScheme!}
            label={
              <ThemedText>
                <MaterialCommunityIcons name="pencil" size={19} /> {PostCreationTexts.form.description.label[language]}
              </ThemedText>
            }
            TextInputProps={{
              value: editPostForm.description,
              placeholder: PostCreationTexts.form.description.placeholder[language],
              onChangeText: (text) => setEditPostForm({ ...editPostForm, description: text }),
            }}
          />
          <Input
            colorScheme={colorScheme!}
            label={
              <ThemedText>
                <MaterialCommunityIcons name="map-marker-outline" size={19} />{' '}
                {PostCreationTexts.form.location.label[language]}
              </ThemedText>
            }
            TextInputProps={{
              value: editPostForm.location,
              placeholder: PostCreationTexts.form.location.placeholder[language],
              onChangeText: (text) => setEditPostForm({ ...editPostForm, location: text }),
            }}
          />
          <SheetSelection
            ref={sheet}
            placeholder={
              <View className="flex flex-row items-center">
                {car && getCarImage(car.type, colorScheme!, 90, 52, 3.3)}
                <ThemedText className="tlg">{car ? car.manufacturer + ' ' + car.model : SelectionTexts.vehicle[language]}</ThemedText>
              </View>
            }
            language={language}
            colorScheme={colorScheme!}
            key={car ? car.model : '0'}
            FlashListProps={{
              data: cars,
              estimatedItemSize: 97,
              keyExtractor: (item) => item.id.toString(),
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
                              setEditPostForm({
                                ...editPostForm,
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
                                {PostCreationTexts.buttons.unassignVehicle[language]}
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
                    setEditPostForm({ ...editPostForm, vehicleId: item.id });
                  }}
                >
                  <View className="pointer-events-none">
                    <GarageItem isOwner={true} colorScheme={colorScheme!} language={language} car={item} />
                  </View>
                </Pressable>
              ),
            }}
          />

          <Button
            variant="highlight"
            type="fill"
            onPress={() => {
              Keyboard.dismiss();
              bottomSheetRef.current?.present();
            }}
          >
            {PostCreationTexts.confirmPost[language]}
          </Button>
          <BottomSheetModal
            ref={bottomSheetRef}
            enablePanDownToClose={true}
            backgroundStyle={{
              backgroundColor: Colors[colorScheme!].secondary,
            }}
            snapPoints={['80%', '90%']}
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
              favorite={post.favorite}
                user={user!}
                vehicle={car ? car : null}
                postId={null}
                authorProfileImg={user!.profileImg}
                authorId={user!.id}
                authorNickname={user!.nickname}
                authorUsername={user!.username}
                colorScheme={colorScheme!}
                date={new Date().toDateString()}
                description={editPostForm.description}
                images={post?.images || []}
                language={language}
                location={editPostForm.location}
                comments={[]}
                preview
                reaction={'FIRE'}
                reactions={{ FIRE: 12, HEART: 34, COOL: 567 }}
                event={null}
                group={post.group}
              />
              <Button onPress={() => bottomSheetRef.current?.dismiss()} className="button primary my-4 btn-fill" innerTextClassName='tlg'>
                Dismiss
              </Button>
              <Button onPress={handleSubmit} className="button highlight-themed btn-fill" innerTextClassName='tlg'>
                Post
              </Button>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </Pressable>
    );
}
