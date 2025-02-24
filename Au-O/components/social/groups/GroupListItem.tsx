import { ImageBackground, Pressable, View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { CommonStaticElementProps } from '@/constants/types';
import { Images } from '@/lib/staticAssetExports';
import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatNumber } from '@/lib/functions';
import { Group } from '@/lib/entity/Group';

export default function GroupListItem({
  group,
  colorScheme,
  language,
  onPress,
}: { group: Group; onPress: () => void } & CommonStaticElementProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        shadowColor: Colors[colorScheme].background,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
      }}
    >
      <View className="group-list-item-container">
        <View className="">
          <ImageBackground
            resizeMode="cover"
            className="group-list-image"
            source={group.bannerImage ? { uri: group.bannerImage } : Images.banner_placeholder}
          >
            <ThemedText className="text-center t2x ">{group.alias.toUpperCase()}</ThemedText>
          </ImageBackground>
        </View>

        <View
          className="group-list-item-data-container"
          style={{
            boxShadow: '-10px 0px 40px 40px ' + Colors[colorScheme!].secondary,
            shadowColor: Colors[colorScheme!].secondary,
          }}
        >
          <ThemedText className="group-list-item-data-group-name">{group.name}</ThemedText>
        </View>
        <View className="group-list-item-misc-data-container">
          <View className="flex flex-col items-center gap-2">
            <ThemedText>{group.public ? 'Public' : 'Private'}</ThemedText>

            <View className="group-list-item-misc-vertical-container">
              <ThemedText className="font-bold items-center flex">{formatNumber(group.memberCount)}</ThemedText>
              <MaterialCommunityIcons color={Colors[colorScheme!].text} name="account-group-outline" size={24} />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
