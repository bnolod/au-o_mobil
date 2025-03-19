/**
 * Autó beállítás menü
 * @module garage/base/VehicleShareSheet
 * @category Components
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChatTexts, PostCreationTexts, PostStatusTexts, SocialTexts } from '@/constants/texts';
import { ActionSheetIOS, Platform, Pressable, View } from 'react-native';
import { handleDelete, handleEdit, handleReport, handleShare } from '@/lib/events/PostOptionEvents';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Colors } from '@/constants/Colors';
import { ScrollView } from 'react-native';
import Avatar from '@/components/ui/Avatar';
import ThemedText from '@/components/ui/ThemedText';
import { apiFetch } from '@/lib/apiClient';
import LatestMessage from '@/lib/entitywebsock/LatestMessage';
import Button from '@/components/ui/Button';
import { useWebSocket } from '@/contexts/WebSocketContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { router, useFocusEffect } from 'expo-router';
import { favoritePost } from '@/lib/ApiCalls/PostApiCalls';
import { deleteCar } from '@/lib/ApiCalls/CarApiCalls';
import { ConfirmDialog, showSuccessToast } from '@/lib/functions';
import SheetDismissModal from '@/components/ui/SheetDismissModal';
export default function VehicleShareSheet({
  language,
  menuVisible,
  setVisible,
  isOwner,
  colorScheme,
  carId,
}: {
  menuVisible: boolean;
  setVisible: (b: boolean) => void;
  language: 'EN' | 'HU';
  carId: number | null;
  colorScheme: 'light' | 'dark';
  isOwner: boolean;
}) {

  function dismiss() {
    setVisible(false);
    ref.current?.dismiss();
  }
  function show() {
    setVisible(true);
    ref.current?.present();
  }
  useEffect(() => {
    if (menuVisible) {
      show();
    } else {
      dismiss();
    }
  }, [menuVisible]);
  const ref = useRef<BottomSheetModal>(null);
  const [targets, setTargets] = useState<string[]>([]);
  const { stompClient } = useWebSocket();
  async function handlePostSend(username: string, carId: number) {
    if (stompClient) {
      const targetedMessage = { username, message: `{{VEHICLE_${carId}_}}` };
      stompClient.publish({
        destination: '/app/chat/user/',
        body: JSON.stringify(targetedMessage),
      });
    }
  }
  const [recipients, setRecipients] = useState<LatestMessage[]>([]);
  const handleFetch = async () => {
    //console.log('Fetching active users...');
    const response = await apiFetch<LatestMessage[]>('/public/activeusers/messagelist', 'GET', true);
    if (response && response.data) {
      setRecipients(response.data);
    }
  };
  useFocusEffect(
    useCallback(() => {
      handleFetch();
      return;
    }, [stompClient])
  );
  return (
    <>
      <SheetDismissModal onDismiss={dismiss} visible={menuVisible}/>
    <BottomSheetModal
      enableOverDrag={false}
      enableDismissOnClose
      handleIndicatorStyle={{
        backgroundColor: Colors[colorScheme].text,
        width: '33%',
      }}
      handleStyle={{
        backgroundColor: Colors[colorScheme].primary,
      }}
      onDismiss={() => dismiss()}
      ref={ref}
    >
      <BottomSheetView>
        <View className="flex flex-col primary p-3 min-h-[25rem] gap-4 justify-end pb-safe-offset-1 w-full">
          <View className="flex flex-col w-full items-center mb-auto justify-between gap-3">
            <View className="flex flex-row w-full items-center mb-auto justify-between gap-3">
            <ThemedText className="ml-3">
              <MaterialCommunityIcons name="send-outline" />
            </ThemedText>
            <ThemedText className="tlg">{PostCreationTexts.options.quickshare[language]}</ThemedText>
            <View className="primary w-2/3 h-0.5 bg-white" />
            </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className=" p-3 secondary rounded-xl max-h-28 w-full">
            <View className="flex flex-row items-center gap-4">
              {recipients.map((rec) => (
                <Pressable
                  key={rec.username}
                  className="flex relative gap-2 rounded-xl mt-2 flex-col items-center"
                  onPress={async () => {
                    if (rec && carId) {
                      if (targets.find((t) => t === rec.username)) {
                        setTargets(targets.filter((t) => t !== rec.username));
                      } else setTargets([...targets, rec.username]);
                    }
                  }}
                >
                  <Avatar image={rec.profileImg} nickname={rec.nickname} />
                  <ThemedText className="tlg">{rec.nickname}</ThemedText>
                  <View className="absolute -top-2 -left-2">
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={28}
                      color={Colors.highlight[colorScheme]}
                      style={{ opacity: targets.find((t) => t === rec.username) ? 1 : 0 }}
                    />
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
          </View>

          {targets && targets.length > 0 && (
            <Button
              disabled={targets.length > 9}
              className=" highlight-themed button primary w-full"
              innerTextClassName="txl"
              onPress={() => {
                for (const target of targets) {
                  handlePostSend(target, carId!);
                }
                setTargets([]);
                dismiss();
                Toast.show({
                  type: 'success',
                  text1: ChatTexts.messagedPosts(targets.join(', '))[language],
                });
              }}
            >
              {ChatTexts.sendPost[language]}
            </Button>
          )}
          {isOwner && (
          <View className="flex flex-row gap-4">
              <Button
                className=" highlight-themed button primary flex-1"
                innerTextClassName="txl"
                onPress={ async () => {
                  dismiss();
                  if (carId) {
                    router.push({
                      pathname: "/(garage)/edit/[id]",
                      params: { id: carId }
                    })
                  }
                }}
              >
                {SocialTexts.edit.car[language]}
              </Button>
              <Button
                className=" highlight-themed button primary flex-1"
                innerTextClassName="txl"
                onPress={ async () => {
                  dismiss();
                  if (carId) {
                    ConfirmDialog(async () => {
                      const res = await deleteCar(carId)
                      if (res) {
                        showSuccessToast(SocialTexts.creation.car.deleted.header[language], SocialTexts.creation.car.deleted.body[language]);
                      }
                    }, SocialTexts.creation.car.prompts.delete.header[language], SocialTexts.creation.car.prompts.delete.body[language]);
                  }
                }}
              >
                {SocialTexts.creation.car.prompts.delete.buttons.delete[language]}
              </Button>
            </View>
          )}
          <View className="flex flex-row gap-4">
            <Button
              className=" highlight-themed button primary flex justify-center flex-1 "
              innerTextClassName="txl self-center"
              onPress={() => {
                dismiss();
                handleReport();
              }}
            >
              {PostCreationTexts.options.report[language]}
            </Button>
            <Button
              className=" border-highlight-light flex justify-center flex-1 dark:border-highlight-dark border-2 button "
              innerTextClassName="txl self-center"
              onPress={() => dismiss()}
            >
              {PostCreationTexts.options.cancel[language]}
            </Button>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
    </>
  );
}