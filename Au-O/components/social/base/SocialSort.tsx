import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CommonStaticElementProps } from '@/constants/types';
import { useState } from 'react';
import SocialSortItem from './SocialSortItem';
import Button from '@/components/ui/Button';
import SheetSelection from '@/components/ui/SheetSelection';

export default function SocialSort({ colorScheme, language }: CommonStaticElementProps) {
  const [selected, setSelected] = useState<any>('My Groups');

  return (
    <View className="social-sort">
      <Button className="social-sort-button">
        <MaterialCommunityIcons name="account-group-outline" size={32} />
      </Button>
      <View className='w-10/12'>

      <SheetSelection
      
      FlashListProps={{
          data: [
            {
              bannerImage: null,
              name: 'My Groups',
            },
          ],
          renderItem: ({ item }) => (
            <SocialSortItem
            colorScheme={colorScheme}
              bannerImage={item.bannerImage}
              memberCount={1}
              name={item.name}
              onSelect={() => {
                setSelected(item.name);
              }}
              />
            ),
            keyExtractor: (item) => item,
          }}
          placeholder={selected}
          colorScheme={colorScheme}
        language={language}
      />
          </View>
    </View>
  );
}
