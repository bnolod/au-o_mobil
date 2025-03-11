import RootHeader from '@/components/home/base/RootHeader';
import NewSocial from '@/components/social/base/NewSocial';
import SocialCard from '@/components/social/base/SocialCard';
import SocialSort from '@/components/social/base/SocialSort';
import { useLanguage } from '@/contexts/LanguageContext';
import { Images } from '@/lib/staticAssetExports';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { ScrollView, View } from 'react-native';
export default function EventFeed() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  return (
    <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
      <View className="primary rounded-b-xl pt-safe-offset-0">
        {/* <RootHeader language={language} colorScheme={colorScheme!} /> */}
        <SocialSort language={language} colorScheme={colorScheme!} />
      <NewSocial text="Create a new event" onPress={() => router.push('/(events)/new')} />
      </View>
      <SocialCard
        type="EVENT"
        event={{
          description: 'This is an event',
          id: 1,
          name: 'Event 1',
          bannerImage: Images.placeholder,
          attendees: 10,
          public: true,
          creationDate: '2021-08-01',
          isAttending: true,
          endDate: '2021-08-02',
          location: 'Budapest',
          startDate: '2021-08-01',
        }}
        language={language}
        colorScheme={colorScheme!}
      />
    </ScrollView>
  );
}
