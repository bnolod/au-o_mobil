import { Pressable, View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import Avatar from '@/components/ui/Avatar';
import { AcceptUserTabProps } from './props';
import { CommonStaticElementProps } from '@/constants/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';
import { Images } from '@/lib/staticAssetExports';
import { router } from 'expo-router';

export default function AcceptUserTab({ user, language }: AcceptUserTabProps & CommonStaticElementProps) {
  return (
    <View className="w-full flex flex-row items-center justify-between gap-2 my-2 secondary rounded-xl">
      <Pressable onPress={() => router.push({pathname: "/(profile)/[id]", params: {id: user.id}})} className="flex flex-row justify-between items-center gap-2 p-3">
        <Avatar image={user.profileImg} />
        <View>
          <ThemedText className="tlg">{user.nickname}</ThemedText>

          <ThemedText className="tsm muted">@{user.username}</ThemedText>
        </View>
      </Pressable>
      <View>
        <ImageBackground
        source={Images.banner_placeholder}
        contentFit='cover'
        
          style={{ display: 'flex', flex: 1, paddingVertical: 8, paddingLeft: 32, paddingRight: 8, gap: 16, alignItems: 'center', flexDirection: 'row' }}
          className="flex flex-row items-center gap-4 justify-center"
        >
          <MaterialCommunityIcons onPress={() => {}} name="close-outline" size={42} color="red" />
          <MaterialCommunityIcons onPress={() => {}} name="check-outline" size={42} color="green" />
        </ImageBackground>
      </View>
    </View>
  );
}
