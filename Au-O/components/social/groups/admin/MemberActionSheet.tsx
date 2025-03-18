/**
 * Poszt beállítás menü
 * @module post/base/PostOptionMenu
 * @category Components
 */
import React, { useEffect, useRef } from 'react';
import {  generalTexts, GroupTexts, PostCreationTexts } from '@/constants/texts';
import { View } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Colors } from '@/constants/Colors';
import { ScrollView } from 'react-native';
import Button from '@/components/ui/Button';
import { GroupMemberResponse, Status } from '@/lib/entity/Group';
import { kickUser, promoteTo } from '@/lib/ApiCalls/GroupApiCalls';
import { showErrorToast, showSuccessToast } from '@/lib/functions';
import { router } from 'expo-router';
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

  async function handleKick() {
    const res = await kickUser(groupId, target.user.id)
    if (res) {
      showSuccessToast(generalTexts.success[language], GroupTexts.application.sudo.status.success.kick[language])
      dismiss()
      return
    }
    else {
      showErrorToast(generalTexts.error[language], GroupTexts.application.sudo.status.failed.kick[language])
      dismiss()
      return
    }
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
                  <Button onPress={async () => {
                    const req = await promoteTo(groupId, target.user.id, 'MODERATOR')
                    if (req) {
                      showSuccessToast(generalTexts.success[language], GroupTexts.application.sudo.status.success.promote[language])
                      dismiss()
                      return
                    }
                    else {
                      showErrorToast(generalTexts.error[language], GroupTexts.application.sudo.status.failed.promote[language])
                      dismiss()
                      return
                    }
                }} className="button secondary">{GroupTexts.application.sudo.promote[language]}</Button>
            )}
                {target.role === 'MODERATOR' && role === 'ADMIN' && (
                    <Button onPress={async () => {
                      const res = await promoteTo(groupId, target.user.id, 'MEMBER')
                      if (res) {
                        showSuccessToast(generalTexts.success[language], GroupTexts.application.sudo.status.success.demote[language])
                          dismiss()
                          return
                        
                      }
                      else {
                        showErrorToast(generalTexts.error[language], GroupTexts.application.sudo.status.failed.demote[language])
                        dismiss()
                        return
                      }
                  }} className="button secondary">{GroupTexts.application.sudo.demote[language]}</Button>
                )}
                {target.role === 'MEMBER' && role !== 'MEMBER' && (
                  <Button className="button secondary" onPress={handleKick}>{GroupTexts.application.sudo.kick[language]}</Button>
                )} {/* moderátor nem rúghat ki vele egy jogosultságú tagot */}
                {target.role === 'MODERATOR' && role === 'ADMIN' && (
                  <Button className="button secondary" onPress={handleKick}>{GroupTexts.application.sudo.kick[language]}</Button>
                )}
                <Button className='secondary button' onPress={() => {dismiss(); router.replace({pathname: "/(profile)/[id]", params: {id: target.user.id}})}}>{GroupTexts.actions.visit[language]}</Button>
                <Button className='secondary button border border-highlight-light dark:border-highlight-dark' onPress={() => dismiss()}>{PostCreationTexts.cancel[language]}</Button>
              </View>
            </ScrollView>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
