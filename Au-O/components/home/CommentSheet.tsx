import React, { useCallback, useRef } from "react";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  
} from "@gorhom/bottom-sheet";

import ThemedText from "../ui/ThemedText";
import {
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Comment } from "@/constants/types";
import Avatar from "../ui/Avatar";
import { HomeTexts } from "@/constants/texts";
import { Colors } from "@/constants/Colors";
import AddCommentRow from "./AddCommentRow";
import CommentElement from "../ui/CommentElement";
import CommentsEmpty from "./CommentsEmpty";

export default function CommentSheet({
  colorScheme,
  comments,
  author_nickname,
  language,
  preview = false,
}: {
  colorScheme: "light" | "dark";
  comments: Comment[];
  author_nickname: string;
  language: "HU" | "EN";
  preview?: boolean;
}) {
  const [focused, setFocused] = React.useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  function handlePresent(): void {
    bottomSheetModalRef.current?.dismiss();
    bottomSheetModalRef.current?.present();
    setFocused(false);
  }

  const renderItem = useCallback(({ item }: { item: Comment }) => {
    return <CommentElement key={item.id} replies={item.replies} text={item.text} />;
  }, []);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        bottomSheetModalRef.current?.dismiss();
        setFocused(false);
      }}
    >
      <View className="post-comment-container">
        <View className="basis-1/12 flex justify-center items-center">
          <Avatar
            className="primary"
            image={null}
            nickname={"teszt"}
            height={12}
            width={12}
          />
        </View>
        <View className="basis-8/12">
          <TouchableWithoutFeedback
            onPress={() => {
              handlePresent();
              setFocused(true);
            }}
          >
            <View className="post-comment-input-trigger">
              <ThemedText className="opacity-40">
                {HomeTexts.post.comment_1[language]}
                <ThemedText className="font-bold">
                  {" " + author_nickname}
                </ThemedText>
                {HomeTexts.post.comment_2[language]}
              </ThemedText>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View className="basis-2/12">
          <TouchableOpacity
            className="post-comment-input"
            onPress={() => {
              bottomSheetModalRef.current?.present();
            }}
          >
            <MaterialCommunityIcons
              name="comment-outline"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
            <ThemedText className="font-bold text-lg">
              {comments.length}
            </ThemedText>
          </TouchableOpacity>
        </View>
        {
          !preview &&
        <BottomSheetModal
        onChange={(index) => {
          if (index === 1) {
            bottomSheetModalRef.current?.dismiss();
            setFocused(false);
          }
        }}
        ref={bottomSheetModalRef}
        onDismiss={() => {
            Keyboard.dismiss();
            setFocused(false);
          }}
          enableDismissOnClose
          enablePanDownToClose={true}
          backgroundStyle={{
            backgroundColor: Colors[colorScheme].secondary,
          }}
          snapPoints={[1, "60%", "90%"]}
          handleIndicatorStyle={{
            backgroundColor: Colors[colorScheme].text,
            width: "33%",
            height: 5,
          }}
          handleStyle={{
            backgroundColor: Colors[colorScheme].secondary,
            
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
          index={2}
        >
          <BottomSheetFlatList
            ListHeaderComponent={
              <AddCommentRow
                focus={focused}
                author_nickname={author_nickname}
                language={language}
                colorScheme={colorScheme}
                />
              }
              data={comments}
              ListEmptyComponent={
                <CommentsEmpty language={language} colorScheme={colorScheme} />
              }
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{
                backgroundColor: Colors[colorScheme].secondary,
                paddingVertical: 12,
                width: "100%",
              }}
              />
        </BottomSheetModal>
    }
      </View>
    </TouchableWithoutFeedback>
  );
}
