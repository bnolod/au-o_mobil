import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../ui/Button';
import SheetSelection from '../ui/SheetSelection';
import { CommonStaticElementProps } from '@/constants/types';
import { useState } from 'react';
import SocialSortItem from './SocialSortItem';

export default function SocialSort({ colorScheme, language }: CommonStaticElementProps) {
  const [selected, setSelected] = useState<any>('My Groups');

  return (
    <View className="social-sort">
      <Button className="social-sort-button">
        <MaterialCommunityIcons name="account-group-outline" size={32} />
      </Button>
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
  );
}
