/**
 * Csoport opciók modal
 * @module social/groups/GroupOptionSheet
 * @category Component
 */
import Avatar from '@/components/ui/Avatar';
import ThemedText from '@/components/ui/ThemedText';
import { Colors } from '@/constants/Colors';
import { ChatTexts, GroupTexts, PostCreationTexts } from '@/constants/texts';
import { CommonStaticElementProps } from '@/constants/types';
import { useWebSocket } from '@/contexts/WebSocketContext';
import LatestMessage from '@/lib/entitywebsock/LatestMessage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Button from '@/components/ui/Button';
import { Group } from '@/lib/entity/Group';
import { useFocusEffect } from 'expo-router';
import { apiFetch } from '@/lib/apiClient';
import { handleDeleteRequest, handleLeave, revokeJoinRequest } from '@/lib/events';
/**
 * 
 * @param {colorScheme, isOwner, language, menuVisible, setVisible, group} props Tulajdonságok
 * @returns 
 */
export default function GroupOptionSheet({
  colorScheme,
  isOwner,
  language,
  menuVisible,
  setVisible,
group,
}: {
  menuVisible: boolean;
  isOwner: boolean;
  setVisible: (b: boolean) => void;
group: Group
} & CommonStaticElementProps) {
  function dismiss() {
    setVisible(false);
    ref.current?.dismiss();
  }
  function show() {
    setVisible(true);
    ref.current?.present();
  }
  const [recipients, setRecipients] = useState<LatestMessage[]>([]);
  const [targets, setTargets] = useState<string[]>([]);
  const { stompClient } = useWebSocket();
  const ref = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (menuVisible) {
      show();
    } else {
      dismiss();
    }
  }, [menuVisible]);
  const handleFetch = async () => {
    console.log('Fetching active users...');
    const response = await apiFetch<LatestMessage[]>('/public/activeusers/messagelist', 'GET', true);
    if (response && response.data) {
      setRecipients(response.data);
    }
  };
  async function handleInvite(username: string, groupId: number) {
    if (stompClient) {
      const targetedMessage = { username, message: `{{GROUP_${groupId}_}}` };
      stompClient.publish({
        destination: '/app/chat/user/',
        body: JSON.stringify(targetedMessage),
      });
    }
  }
  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [stompClient])
  );
  let isAllowed;
  if (group.public) {
    isAllowed = group.member;
  } else {
    isAllowed = group.validMember;
  } //TODO: pass status as prop to GroupPostTab

  if (isOwner) {
    isAllowed = true;
  }
  const canInvite = (isOwner) || (group.validMember && group.public) 
  //csak authorized felhasználó tud privát csoportba inviteolni, nyilvános csoportba a valid felhasználók tudnak.
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
        <View className="flex flex-col primary p-3 min-h-[25rem] gap-4 justify-end pb-safe-offset-1 w-full">
          <View className="flex flex-col w-full items-center mb-auto justify-between gap-3">
            {canInvite && <View className="flex flex-row w-full items-center mb-auto justify-between gap-3">
              <ThemedText className="ml-3">
                <MaterialCommunityIcons name="send-outline" />
              </ThemedText>
              <ThemedText className="tlg">Invite to Group</ThemedText>
              <View className="primary w-2/3 h-0.5 bg-white" />
            </View>
        }
            {canInvite && <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              className=" p-3 secondary rounded-xl max-h-28 w-full"
            >
              <View className="flex flex-row items-center gap-4">
                {recipients.map((rec) => (
                  <Pressable
                    key={rec.username}
                    className="flex relative gap-2 rounded-xl mt-2 flex-col items-center"
                    onPress={async () => {
                      if (rec && group.id) {
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
            </ScrollView>}
          </View>

          {targets && targets.length > 0 && (
            <Button
              disabled={targets.length > 9}
              className=" highlight-themed button primary w-full"
              innerTextClassName="txl"
              onPress={() => {
                for (const target of targets) {
                  handleInvite(target, group.id);
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
             
              <Button
                className=" highlight-themed button primary flex-1"
                innerTextClassName="txl"
                onPress={() => {
                  handleDeleteRequest(group, language).then(() => {
                    dismiss();
                  });
                }}
              >
                {GroupTexts.options.delete[language]}
              </Button>
          )}
          <View className="flex flex-row gap-4">
            {!isOwner && group.validMember && (
              <Button
                className=" highlight-themed button primary flex justify-center flex-1 "
                innerTextClassName="txl self-center"
                onPress={() => {
                  dismiss();
                  handleLeave(group, language);
                }}
              >
                {GroupTexts.options.leave[language]}
              </Button>
            )}
            {!isOwner && !group.validMember && group.member && (
              <Button
                className=" highlight-themed button primary flex justify-center flex-1 "
                innerTextClassName="txl self-center"
                onPress={() => {
                  dismiss();
                  revokeJoinRequest(group, language);
                }}
              >
                {GroupTexts.options.revokeJoinRequest[language]}
              </Button>
            )}
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
  );
}
