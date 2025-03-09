import { FlashList } from '@shopify/flash-list';
import NoPostsFound from '@/components/Post/base/NoPostsFound';

import GarageItem from './GarageItem';
import { router } from 'expo-router';
import { Car } from '@/lib/entity/Car';

export default function GarageList({
  cars,
  userId,
  language,
  colorScheme,
}: {
  cars: Car[];
  userId: string;
  language: 'EN' | 'HU';
  colorScheme: 'light' | 'dark';
}) {
  return (
    <FlashList
      ListEmptyComponent={<NoPostsFound language={language} />}
      data={cars}
      style={{ padding: 10 }}
      estimatedItemSize={99}
      renderItem={({ item }) => (
        <GarageItem
          isOwner={userId.toString() === item.owner?.id.toString()}
          colorScheme={colorScheme}
          language={language}
          car={item}
          onPress={() => {
            router.push({
              pathname: '/(garage)/[id]',
              params: { id: item.id },
            });
          }}
        />
      )}
    />
  );
}
