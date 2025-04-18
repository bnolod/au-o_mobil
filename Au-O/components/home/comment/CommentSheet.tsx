
/**
 * Kommentek megjelenítése szolgáló sheet
 * @module home/comment/CommentSheet
 * @category Component
 */
import React, { useCallback, useRef, useState } from 'react';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';

import ThemedText from '@/components/ui/ThemedText'
import { TouchableOpacity, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CommonStaticElementProps } from '@/constants/types';
import Avatar from '@/components/ui/Avatar';
import { Comment } from '@/lib/entity/Comment';
import { HomeTexts } from '@/constants/texts';
import { Colors } from '@/constants/Colors';
import AddCommentRow from '../comment/AddCommentRow';
import CommentElement from '@/components/ui/CommentElement';
import CommentsEmpty from './CommentsEmpty';
import { CommentSheetProps } from './props';
/**
 * @param {CommentSheetProps} props
 */
export default function CommentSheet({
  colorScheme,
  comments,
  authorNickname,
  authorId,
  language,
  userNickname,
  userId,
  userProfileImg,
  preview = false,
  postId,
}: CommentSheetProps & CommonStaticElementProps) {
  const [focused, setFocused] = React.useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [renderedComments, setRenderedComments] = useState<Comment[]>(comments);
  function handlePresent(): void {
    bottomSheetModalRef.current?.dismiss();
    bottomSheetModalRef.current?.present();
    setFocused(false);
  }

  const renderItem = useCallback(({ item }: { item: Comment; index: number }) => {
    return (
      <CommentElement
        preview={preview}
        colorScheme={colorScheme}
        onDelete={(id) => setRenderedComments(renderedComments.filter((item) => id !== item.id))}
        userId={userId}
        key={item.id}
        item={item}
        language={language}
        authorId={authorId}
      />
    );
  }, []);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        bottomSheetModalRef.current?.dismiss();
        setFocused(false);
      }}
    >
      <View className="flex flex-row w-screen justify-between items-center bg-backdrop-secondary dark:bg-backdrop-secondary-dark py-1 px-2">
        <View className="">
          <Avatar className="primary" image={userProfileImg} nickname={userNickname} height={12} width={12} />
        </View>
        <View className="basis-8/12">
          <TouchableWithoutFeedback
            onPress={() => {
              handlePresent();
              // setFocused(true);
            }}
          >
            <View className="post-comment-input-trigger">
              <ThemedText className="muted ">
                {HomeTexts.post.comment_1[language]}
                <ThemedText className="font-bold">{' ' + authorNickname}</ThemedText>
                {HomeTexts.post.comment_2[language]}
              </ThemedText>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View className="basis-2/12">
          <TouchableOpacity
            className="flex flex-row items-center justify-between p-2 flex-grow rounded-xl bg-backdrop-primary dark:bg-backdrop-primary-dark"
            onPress={() => {
              // bottomSheetModalRef.current?.present();
              handlePresent();
              // setFocused(true);
            }}
          >
            <MaterialCommunityIcons
              name="comment-outline"
              size={24}
              color={colorScheme === 'dark' ? 'white' : 'black'}
            />
            <ThemedText className="font-bold text-lg">{comments.length}</ThemedText>
          </TouchableOpacity>
        </View>
        {!preview && (
          <>
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
              snapPoints={[1, '90%', '90%']}
              handleIndicatorStyle={{
                backgroundColor: Colors[colorScheme].text,
                width: '33%',
                height: 5,
              }}
              enableHandlePanningGesture
              
              handleStyle={{
                backgroundColor: Colors[colorScheme].primary,
                
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
              index={2}
            >
              <BottomSheetFlatList
                ListHeaderComponent={
                  <AddCommentRow
                    focus={focused}
                    authorNickname={authorNickname}
                    language={language}
                    colorScheme={colorScheme}
                    postId={postId}
                    
                    onPostComment={(res) => {
                      setRenderedComments([res, ...renderedComments]);
                    }}
                  />
                }
                bounces={false}
                className={`bg-backdrop-primary dark:bg-backdrop-primary-dark`}
                data={renderedComments}
                ListEmptyComponent={<CommentsEmpty language={language} colorScheme={colorScheme} />}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                  paddingVertical: 12,
                  width: '100%',
                }}
                automaticallyAdjustKeyboardInsets
              />
            </BottomSheetModal>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
