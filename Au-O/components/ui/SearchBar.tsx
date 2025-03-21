/**
 * Kereső mező
 * @module ui/SearchBar
 * @category Component
 */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Keyboard, TextInput, View } from 'react-native';
import Button from './Button';
import { SearchBarProps } from './props';
/**
 * @param {SearchBarProps} props Tulajdonságok
 */
export default function SearchBar({
  placeholder,
  onChangeText,
  onSearch,
  colorScheme,
}: SearchBarProps & { colorScheme?: 'dark' | 'light' }) {
  const [query, setQuery] = useState<string>('');
  return (
    <View className="basis-8/12 rounded-xl mx-auto h-12 secondary flex flex-row items-center justify-between backdrop-opacity-0">
      <TextInput
        placeholderTextColor={'#767676'}
        placeholder={placeholder}
        className=" h-full px-3 basis-5/6 text-black dark:text-white"
        onChangeText={
          onChangeText
            ? (e) => onChangeText(e)
            : (e) => {
                setQuery(e);
              }
        }
      />
      <Button
        className="flex items-center mr-2"
        onPress={() => {
          Keyboard.dismiss();
          onSearch(query);        }}
        hapticFeedback="medium"
      >
        <MaterialCommunityIcons name="magnify" size={32} color={colorScheme === 'light' ? 'black' : 'white'} />
      </Button>
    </View>
  );
}
