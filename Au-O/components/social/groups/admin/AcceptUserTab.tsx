/**
 * Adminisztrátor által elfogadandó felhasználók megjelenítése
 * @module social/groups/admin/AcceptUserTab
 * @category Components
 */
import { Pressable, View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import Avatar from '@/components/ui/Avatar';
import { AcceptUserTabProps } from './props';
import { CommonStaticElementProps } from '@/constants/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';
import { Images } from '@/lib/staticAssetExports';
import { router } from 'expo-router';
import { acceptApplication, rejectApplication } from '@/lib/ApiCalls/GroupApiCalls';
import { showErrorToast, showSuccessToast } from '@/lib/functions';
import { GroupTexts } from '@/constants/texts';
import { useState } from 'react';
/**
 * @param {AcceptUserTabProps & CommonStaticElementProps} props - Tulajdonságok
 */
export default function AcceptUserTab({ user, groupId, language }: AcceptUserTabProps & CommonStaticElementProps) {
  const [isResolved, setIsResolved] = useState(false);
  if (!isResolved)
  return (
    <View className="w-full flex flex-row items-center justify-between gap-2 my-2 secondary rounded-xl">
      <Pressable onPress={() => router.push({pathname: "/(profile)/[id]", params: {id: user.user.id}})} className="flex flex-row justify-between items-center gap-2 p-3">
        <Avatar image={user.user.profileImg} />
        <View>
          <ThemedText className="tlg">{user.user.nickname}</ThemedText>

          <ThemedText className="tsm muted">@{user.user.username}</ThemedText>
        </View>
      </Pressable>
      <View>
        <ImageBackground
        source={Images.banner_placeholder}
        contentFit='cover'
        
          style={{ display: 'flex', flex: 1, paddingVertical: 8, paddingLeft: 32, paddingRight: 8, gap: 16, alignItems: 'center', flexDirection: 'row' }}
          className="flex flex-row items-center gap-4 justify-center"
        >
          <MaterialCommunityIcons onPress={async () => {
            const res = await rejectApplication(groupId, user.user.id);
            if (res) {showSuccessToast(GroupTexts.application.reject.success[language]); setIsResolved(true)} else showErrorToast(GroupTexts.application.reject.error[language])
          }} name="close" size={42} color="red" />
          <MaterialCommunityIcons onPress={async () => {
             const res = await acceptApplication(groupId, user.user.id);
             if (res) {showSuccessToast(GroupTexts.application.accept.success[language]); setIsResolved(true)} else showErrorToast(GroupTexts.application.accept.error[language])
          }} name="check" size={42} color="green" />
        </ImageBackground>
      </View>
    </View>
  );
}
