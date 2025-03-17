/**
 * Poszt beállítás menü
 * @module post/base/PostOptionMenu
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
import { useFocusEffect } from 'expo-router';
import { favoritePost } from '@/lib/ApiCalls/PostApiCalls';
export default function PostOptionModal({
  language,
  menuVisible,
  setVisible,
  colorScheme,
  postId,
  authorId,
  userId,
  favorite,
}: {
  menuVisible: boolean;
  setVisible: (b: boolean) => void;
  language: 'EN' | 'HU';
  postId: number | null;
  authorId: number | null;
  colorScheme: 'light' | 'dark';
  userId: number | null;
  favorite: boolean;
}) {

  const handleFavorite = async () => {
    const res = await favoritePost(postId!)
    if ( res == "added") {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }

  const isOwner = userId === authorId;
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
  const [isFavorite, setIsFavorite] = useState<boolean>(favorite);
  const ref = useRef<BottomSheetModal>(null);
  const [targets, setTargets] = useState<string[]>([]);
  const { stompClient } = useWebSocket();
  async function handlePostSend(username: string, postId: number) {
    if (stompClient) {
      const targetedMessage = { username, message: `{{POST_${postId}_}}` };
      stompClient.publish({
        destination: '/app/chat/user/',
        body: JSON.stringify(targetedMessage),
      });
    }
  }
  const [recipients, setRecipients] = useState<LatestMessage[]>([]);
  const handleFetch = async () => {
    console.log('Fetching active users...');
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
                    if (rec && postId) {
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
                  handlePostSend(target, postId!);
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
                onPress={() => {
                  dismiss();
                  handleEdit(authorId, userId, postId);
                }}
              >
                {PostCreationTexts.options.edit[language]}
              </Button>
              <Button
                className=" highlight-themed button primary flex-1"
                innerTextClassName="txl"
                onPress={() => {
                  dismiss();
                  handleDelete(authorId, userId, language, postId);
                }}
              >
                {PostCreationTexts.deletePost[language]}
              </Button>
            </View>
          )}
          <View className="flex flex-row gap-4">
          {/* favorite ize ikon */}
          <Button
              onPress={() => {
                handleFavorite();
              }}
            >
              <MaterialCommunityIcons name={isFavorite ? "bookmark" : "bookmark-outline"} size={40} className="self-center" color={isFavorite? Colors.highlight.main : Colors.dark.text}>

              </MaterialCommunityIcons>
            </Button>
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
  );
}
/**@deprecated */
export function DeprecatedPostOptionMenu(
  preview: boolean,
  language: 'EN' | 'HU',
  postId: number,
  userId: number | null,
  authorId: number | null,
  onDelete?: () => void,
  onShow?: () => void
) {
  if (preview) return null;
  let iosOptions = [
    PostCreationTexts.options.cancel[language],
    PostCreationTexts.options.share[language],
    PostCreationTexts.options.report[language],
  ];
  if (authorId && authorId === userId) {
    iosOptions.push(PostCreationTexts.options.edit[language], PostCreationTexts.deletePost[language]);
  }

  if (Platform.OS === 'ios') {
    return ActionSheetIOS.showActionSheetWithOptions(
      {
        options: iosOptions,

        cancelButtonIndex: 0,
        destructiveButtonIndex: 4,
        title: PostStatusTexts.options.title[language],
      },
      async (buttonIndex) => {
        if (buttonIndex === 1) {
          await handleShare(postId, language);
        }
        if (buttonIndex === 2) {
          await handleReport();
        }
        if (buttonIndex === 3) {
          await handleEdit(authorId, userId, postId);
        }
        if (buttonIndex === 4) {
          await handleDelete(authorId, userId, language, postId, onDelete);
        }
      }
    );
  } else if (Platform.OS === 'android') {
    onShow && onShow();
  }
}
