/**
 * Garázsban található elemeket megjelenítő komponens
 * @module garage/list/GarageList
 * @category Components
 */

import { FlashList } from '@shopify/flash-list';
import NoPostsFound from '@/components/Post/base/NoPostsFound';
import GarageItem from './GarageItem';
import { router } from 'expo-router';
import { Car } from '@/lib/entity/Car';
/**
 * Garázs lista elem
 * @property {Car[]} cars Autók
 * @property {string} userId Felhasználó azonosító
 * @property {'EN' | 'HU'} language Nyelv
 * @property {'light' | 'dark'} colorScheme Szín séma
 */
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
      contentContainerClassName="pb-24"
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
