/**
 * Közösségi rendezés komponens
 * @module social/base/SocialSort
 */
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CommonStaticElementProps } from '@/constants/types';
import { useEffect, useRef, useState } from 'react';
import SocialSortItem from './SocialSortItem';
import Button from '@/components/ui/Button';
import SheetSelection, { SheetSelectionRef } from '@/components/ui/SheetSelection';
import { generalTexts,  } from '@/constants/texts';
import { SocialEvent } from '@/lib/entity/SocialEvent';
import { Group } from '@/lib/entity/Group';
import BottomSheet from '@gorhom/bottom-sheet';
/**
 * @param {CommonStaticElementProps} props - Tulajdonságok
 */
export default function SocialSort({items, colorScheme, language, onSelect }: {items: (SocialEvent | Group)[] | undefined, onSelect: (selected: SocialEvent | Group | undefined | null) => void} & CommonStaticElementProps) {
  if (!items) return null;
  
  const [selected, setSelected] = useState<SocialEvent | Group | undefined | null>(undefined);
  useEffect(() => {
    SocialSheetRef.current?.dismissSheet()
    onSelect(selected);
  }, [selected])
  const SocialSheetRef = useRef<SheetSelectionRef>(null);
  return (
    <View className="social-sort">
      <Button className="social-sort-button">
        <MaterialCommunityIcons name="account-group-outline" size={32} />
      </Button>
      <View className='w-10/12'>

      <SheetSelection
      ref={SocialSheetRef}
      FlashListProps={{
          data: items,
          ListHeaderComponent: () => (
            <View className='flex flex-row h-16 gap-4 mx-2'>
                <Button onPress={() => setSelected(undefined)} className={`items-center justify-center ${selected === undefined ? "highlight-themed " : "secondary"} flex-1 button`} innerTextClassName='txl'>
                  {generalTexts.profileAttributes.filters.group.my[language]}
                </Button>
                <Button onPress={() => setSelected(null)} className={`items-center justify-center  ${selected === null ? "highlight-themed " : "secondary"} flex-1 button`} innerTextClassName='txl'>
                  {generalTexts.profileAttributes.filters.group.discover[language]}
                </Button>
              </View>
          ),
          renderItem: ({ item }: {item: Group | SocialEvent}) => (
            <SocialSortItem
              bannerImage={item.bannerImage}
              name={item.name}
              memberCount={0}
              onSelect={() => setSelected(item)}
              colorScheme={colorScheme}
            />
            ),
            keyExtractor: (item) => item.name,
          }}
          placeholder={selected === null ?
            generalTexts.profileAttributes.filters.group.discover[language] : selected === undefined ? generalTexts.profileAttributes.filters.group.my[language]
            : selected?.name || "name"
          }
          colorScheme={colorScheme}
        language={language}
      />
          </View>
    </View>
  );
}
