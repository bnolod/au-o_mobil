/**
 * Követői sheet
 * @module home/user/FollowerSheet
 * @category Component
 */
import { BottomSheetFlashList, BottomSheetModal } from '@gorhom/bottom-sheet';
import UserListCard from '@/components/ui/UserListCard';
import { CommonStaticElementProps } from '@/constants/types';
import { Colors } from '@/constants/Colors';
import ThemedText from '@/components/ui/ThemedText';
import { TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { SocialTexts } from '@/constants/texts';
import { User } from '@/lib/entity/User';
import { FollowerSheetProps } from './props';
/**
 * Követő sheet
 * @param {FollowerSheetProps} props
 */
export default function FollowerSheet({
  followers,
  following,
  colorScheme,
  language,
  isOwner,
  dismissSheet,
}: FollowerSheetProps & CommonStaticElementProps) {
  const [data, setData] = useState<User[]>(followers);
  return (
    <BottomSheetFlashList
      ListHeaderComponent={() => (
        <View className="follower-sheet-header">
          <TouchableOpacity className="follower-sheet-selector" onPress={() => setData(followers)}>
            <MaterialCommunityIcons
              name="account-check-outline"
              size={32}
              color={data === followers ? Colors.highlight.main : Colors[colorScheme].text}
            />
            <ThemedText className="tlg p-2">{SocialTexts.followers.selector[language]}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity className="follower-sheet-selector" onPress={() => setData(following)}>
            <MaterialCommunityIcons
              name="account-heart-outline"
              size={32}
              color={data === following ? Colors.highlight.main : Colors[colorScheme].text}
            />
            <ThemedText className="tlg p-2">{SocialTexts.following.selector[language]}</ThemedText>
          </TouchableOpacity>
        </View>
      )}
      contentContainerStyle={{
        backgroundColor: Colors[colorScheme].background,
      }}
      estimatedItemSize={81}
      data={data}
      keyExtractor={(item, index) => item.id.toString()}
      ListEmptyComponent={() => (
        <View className="follower-sheet-empty-container">
          <MaterialCommunityIcons name="account-search" size={64} color={Colors[colorScheme].text} />
          <ThemedText className="tlg mt-24 text-center p-2">
            {SocialTexts.followers.generals.empty[language]}
          </ThemedText>
        </View>
      )}
      renderItem={({ item }) => (
        <View className='primary m-1 rounded-xl'>

        <UserListCard
          isOwner={isOwner}
          dismissSheet={dismissSheet}
          user={item}
          type={data === followers ? 'follower' : 'following'}
          colorScheme={colorScheme}
          language={language}
          />
          </View>
      )}
    />
  );
}
