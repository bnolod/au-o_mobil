import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { TextInput, View } from 'react-native';
import Button from './Button';
import { SearchBarProps } from './props';

export default function SearchBar({
  placeholder,
  onChangeText,
  onSearch,
  colorScheme,
}: SearchBarProps & { colorScheme?: 'dark' | 'light' }) {
  const [query, setQuery] = useState<string>('');
  return (
    <View className="basis-8/12 rounded-xl mx-auto h-12 secondary flex flex-row items-center justify-between"
    style={{
      boxShadow: colorScheme === 'light' ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : '0px 4px 4px rgba(0, 0, 0, 0.25)',
    }}>
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
      <Button className="flex items-center mr-2" onPress={() => onSearch(query)} hapticFeedback="medium">
        <MaterialCommunityIcons name="magnify" size={32} color={colorScheme === 'light' ? 'black' : 'white'} />
      </Button>
    </View>
  );
}
