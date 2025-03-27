import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';

import { searchUsers } from '@/lib/apiClient';
import LoadingModal from '@/components/ui/LoadingModal';
import ThemedText from '@/components/ui/ThemedText';
import { User } from '@/lib/entity/User';
import Avatar from '@/components/ui/Avatar';
import { SearchTexts } from '@/constants/texts';
import { useLanguage } from '@/contexts/LanguageContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function SearchPage() {
  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  const { id } = useLocalSearchParams();
  const searchId = Array.isArray(id) ? id[0] : id;

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true);
    getSearchResult().finally(() => setRefreshing(false));
  };

  async function getSearchResult() {
    if (!searchId) return;
    try {
      if(id != ''){
        //console.log(searchId)
      const res = await searchUsers(searchId);
      setSearchResult(res ?? []);
      setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }

  useEffect(() => {
    getSearchResult();
  }, [searchId]);

  return (
    <ScrollView
      refreshControl={<RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />}
      className="background mx-auto w-full"
    >
      
      <LoadingModal colorScheme={colorScheme!} loading={refreshing} />
      <ThemedText className="primary rounded-b-xl pt-safe-offset-4 pb-3 text-center txl">
        {SearchTexts.results[language]} <ThemedText className="text-xl">{id}</ThemedText>
      </ThemedText>
      {!loading ? (
        searchResult.length > 0 ? (
          searchResult.map((user) => (
            <Pressable
              key={user.id}
              className="rounded-lg  shadow-lg p-4 my-2 flex flex-row items-center gap-4 "
              onPress={() => router.push({ pathname: '/(profile)/[id]', params: { id: user.id } })}
            >
              <Avatar image={user.profileImg} nickname={user.nickname} />
              <View>
                <ThemedText className="tlg">{user.nickname}</ThemedText>
                <ThemedText>@{user.username}</ThemedText>
              </View>
            </Pressable>
          ))
        ) : (
          <View className='flex gap-2 items-center justify-center rounded-xl secondary w-1/2 mx-auto mt-8 p-3 aspect-square'>
            <ThemedText>
              <MaterialCommunityIcons name='magnify-close' size={128} color={Colors.highlight[colorScheme!]} />
            </ThemedText>
            <ThemedText className='txl text-center mt-2'>
              {SearchTexts.nothing[language]}
            </ThemedText>
          </View>
        )
      ) : (
       <LoadingModal colorScheme={colorScheme!} loading={loading}/>  
      )}
    </ScrollView>
  );
}
