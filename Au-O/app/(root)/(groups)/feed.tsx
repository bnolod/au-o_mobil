import RootHeader from '@/components/home/base/RootHeader';
import NewSocial from '@/components/social/base/NewSocial';
import SocialCard from '@/components/social/base/SocialCard';
import SocialSort from '@/components/social/base/SocialSort';
import LoadingModal from '@/components/ui/LoadingModal';
import { GroupTexts } from '@/constants/texts';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAllGroups } from '@/lib/ApiCalls/GroupApiCalls';
import { Group } from '@/lib/entity/Group';
import { loading } from '@/lib/Validation/responses';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

export default function GroupFeed() {
  const { language } = useLanguage();
  const [refreshing, setRefreshing] = useState(false);
  const [groups, setGroups] = useState<Group[]>();
  const { colorScheme } = useColorScheme();
  async function fetchGroups() {
    const res = await getAllGroups();
    if (res) {
      setGroups(res);
    }
  }
  useEffect(() => {
    fetchGroups();
  }, [refreshing]);
  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}>
          <LoadingModal colorScheme={colorScheme!} loading={refreshing} text={loading[language]} />
        </RefreshControl>
      }
      stickyHeaderHiddenOnScroll
      stickyHeaderIndices={[0]}
    >
      <View className="primary rounded-b-xl">
        <RootHeader language={language} colorScheme={colorScheme!} />
        <SocialSort language={language} colorScheme={colorScheme!} />
        <NewSocial text={GroupTexts.actions.create[language]} onPress={() => router.push('/(groups)/new')} />
      </View>
      <FlashList
        estimatedFirstItemOffset={250}
        data={groups}
        keyExtractor={(item) => item.id + ''}
        renderItem={({ item }) => (
          <SocialCard type="GROUP" group={item} colorScheme={colorScheme!} language={language} />
        )}
      />
    </ScrollView>
  );
}
