import { View } from 'react-native';
import { GroupMessageProps } from '../props';
import { GroupInviteProps } from './props';
import { useEffect, useState } from 'react';
import { Group } from '@/lib/entity/Group';
import { getGroup } from '@/lib/ApiCalls/GroupApiCalls';
import Avatar from '@/components/ui/Avatar';
import ThemedText from '@/components/ui/ThemedText';
import { Image, ImageBackground } from 'expo-image';
import { Text } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Images } from '@/lib/staticAssetExports';
import Button from '@/components/ui/Button';

export default function GroupInvite({ sender, colorScheme, groupId }: GroupInviteProps) {
  const [group, setGroup] = useState<Group | null>(null);

  async function fetchGroup() {
    const res = await getGroup(groupId);
    if (res) {
      setGroup(res);
    }
  }
  useEffect(() => {
    fetchGroup()
  }, [])
  return (
    <View className={`flex my-2 flex-col overflow-hidden w-2/3 ${sender ? 'self-end' : 'self-start'} rounded-xl`}>
      {group && (
        <>
          <View className="flex flex-col">
            <ImageBackground
              style={{
                padding: 12,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                backgroundColor: sender ? Colors[colorScheme].secondary : Colors[colorScheme].primary,
              }}
              source={group.bannerImage ? {uri: group.bannerImage} : Images.banner_placeholder}
            >
              <ThemedText className="t2x text-center m-auto" >{group.alias}</ThemedText>
            </ImageBackground>
          </View>
          <View className={` ${!sender ? 'highlight-themed' : 'secondary'} p-2 w-full`} style={{boxShadow: `10px 0px 10px 10px ${sender ? Colors[colorScheme].secondary : Colors.highlight[colorScheme]}`}}>
            <ThemedText className='my-2'>
              <Text
                onPress={() => router.push({ pathname: '/(groups)/[id]', params: { id: group.id } })}
                className={`font-bold ${sender ? 'text-highlight' : 'text'}`}
              >
                You have been invited to{' '}
              </Text>
              <ThemedText numberOfLines={2}>{group.name}</ThemedText>
            </ThemedText>
            <Button innerTextClassName='tlg' className='button highlight-themed btn-fill' onPress={() => router.push({ pathname: '/(groups)/[id]', params: { id: group.id } })}>
              Visit
              </Button>
          </View>
        </>
      )}
    </View>
  );
}
