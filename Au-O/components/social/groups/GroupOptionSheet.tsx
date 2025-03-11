import Avatar from '@/components/ui/Avatar';
import ThemedText from '@/components/ui/ThemedText';
import { Colors } from '@/constants/Colors';
import { ChatTexts, PostCreationTexts } from '@/constants/texts';
import { CommonStaticElementProps } from '@/constants/types';
import { useWebSocket } from '@/contexts/WebSocketContext';
import LatestMessage from '@/lib/entitywebsock/LatestMessage';
import { handleDelete, handleEdit, handleReport } from '@/lib/events/PostOptionEvents';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Button from '@/components/ui/Button';
import { Group } from '@/lib/entity/Group';
import { useFocusEffect } from 'expo-router';
import { getGroup } from '@/lib/ApiCalls/GroupApiCalls';

export default function GroupOptionSheet({
  colorScheme,
  groupId,
  language,
  menuVisible,
  setVisible,
  isMember,
  isValidMember,
  isPublic,
  isOwner,

}: {    
  menuVisible: boolean;
  setVisible: (b: boolean) => void;
isMember: boolean;
isValidMember: boolean;
isPublic: boolean;
isOwner: boolean;
  groupId: number;
} & CommonStaticElementProps) {
    function dismiss() {
        setVisible(false);
        ref.current?.dismiss();
      }
      function show() {
        setVisible(true);
        ref.current?.present();
      }
  const [group, setGroup] = useState<Group>()
  const [recipients, setRecipients] = useState<LatestMessage[]>([]);
  const [targets, setTargets] = useState<string[]>([]);
  const { stompClient } = useWebSocket();
  const ref = useRef<BottomSheetModal>(null);

      

  useFocusEffect(
    useCallback(() => {
    }, [stompClient])
  )
  let isAllowed;
  if (isPublic) {
    isAllowed = isMember;
  } else {
    isAllowed = isValidMember;
  } //TODO: pass status as prop to GroupPostTab

  if (isOwner) {
    isAllowed = true;
  }
  return (
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
        <View className="flex flex-col primary p-3 min-h-96 justify-between pb-safe-offset-1 w-full">
          <View className="flex flex-row items-center justify-between gap-3">
            <ThemedText className="ml-3">
              <MaterialCommunityIcons name="send-outline" />
            </ThemedText>
            <ThemedText className="tlg">Quick Send</ThemedText>
            <View className="primary w-2/3 h-0.5 bg-white" />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className=" p-3 secondary rounded-xl max-h-28">
            <View className="flex flex-row items-center gap-4">
              {recipients.map((rec) => (
                <Pressable
                  key={rec.username}
                  className="flex relative gap-2 rounded-xl mt-2 flex-col items-center"
                  onPress={async () => {
                    if (rec && groupId) {
                      if (targets.find((t) => t === rec.username)) {
                        setTargets(targets.filter((t) => t !== rec.username));
                      } else setTargets([...targets, rec.username]);
                      /* handlePostSend(rec.username, groupId!).then(() => {
                      Toast.show({
                        type: 'success',
                        text1: ChatTexts.messagedPosts(rec.nickname)[language]
                      })
                      dismiss()
                    }) */
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
          <View className="flex flex-col gap-4">
            {targets && targets.length > 0 && (
              <Button
                disabled={targets.length > 9}
                className=" highlight-themed button primary btn-fill"
                innerTextClassName="txl"
                onPress={() => {
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
            {isAllowed && (
              <Button
                className=" highlight-themed button primary btn-fill"
                innerTextClassName="txl"
                onPress={() => {
                  dismiss();
                }}
              >
                {PostCreationTexts.options.edit[language]}
              </Button>
            )}
            {isAllowed && (
              <Button
                className=" highlight-themed button primary btn-fill"
                innerTextClassName="txl"
                onPress={() => {
                  dismiss();
                }}
              >
                {PostCreationTexts.deletePost[language]}
              </Button>
            )}

            <Button
              className=" highlight-themed button primary btn-fill"
              innerTextClassName="txl"
              onPress={() => {
                dismiss();
                handleReport();
              }}
            >
              {PostCreationTexts.options.report[language]}
            </Button>
            <Button
              className=" border-highlight-light dark:border-highlight-dark border-2 button btn-fill"
              innerTextClassName="txl"
              onPress={() => dismiss()}
            >
              {PostCreationTexts.options.cancel[language]}
            </Button>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
