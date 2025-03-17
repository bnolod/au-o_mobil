/**
 * Poszt beállítás menü
 * @module post/base/PostOptionMenu
 * @category Components
 */
import React, { useEffect, useRef } from 'react';
import {  GroupTexts } from '@/constants/texts';
import { View } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Colors } from '@/constants/Colors';
import { ScrollView } from 'react-native';
import Button from '@/components/ui/Button';
import { GroupMemberResponse, Status } from '@/lib/entity/Group';
import { promoteTo } from '@/lib/ApiCalls/GroupApiCalls';
export default function MemberActionSheet({
  role,
  target,
  menuVisible,
  setVisible,
  colorScheme,
  language,
  groupId
}: {
  role: Status;
  target: GroupMemberResponse;
  language: 'EN' | 'HU';
  colorScheme: 'light' | 'dark';
  menuVisible: boolean;
  groupId: number,
  setVisible: (b: boolean) => void;
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
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className=" p-3 secondary rounded-xl max-h-28 w-full"
            >
              <View className="flex flex-row items-center gap-4">
                {target.role === 'MEMBER' && role === 'ADMIN' && (
                  <Button onPress={() => {
                    promoteTo(groupId, target.user.id, 'MODERATOR')
                }} className="button secondary">{GroupTexts.application.sudo.promote[language]}</Button>
            )}
                {target.role !== 'MODERATOR' && role === 'ADMIN' && (
                    <Button onPress={() => {
                      promoteTo(groupId, target.user.id, 'MEMBER')
                  }} className="button secondary">{GroupTexts.application.sudo.demote[language]}</Button>
                )}
                {target.role === 'MEMBER' && role !== 'MEMBER' && (
                  <Button className="button secondary">{GroupTexts.application.sudo.kick[language]}</Button>
                )} {/* moderátor nem rúghat ki vele egy jogosultságú tagot */}
                {target.role === 'MODERATOR' && role === 'ADMIN' && (
                  <Button className="button secondary">{GroupTexts.application.sudo.kick[language]}</Button>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
