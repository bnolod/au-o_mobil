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
      className="primary mx-auto w-full pt-safe-offset-4"
    >
      <LoadingModal colorScheme={colorScheme!} loading={refreshing} />
      <ThemedText className="text-center">
        {SearchTexts.results[language]} <Text className="text-xl">{id}</Text>
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
          <ThemedText>No users found.</ThemedText>
        )
      ) : (
       <LoadingModal colorScheme={colorScheme!} loading={loading}/>  
      )}
    </ScrollView>
  );
}
