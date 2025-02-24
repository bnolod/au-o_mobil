import { Image, Platform, View } from 'react-native';
import ThemedText from '../ui/ThemedText';
import SearchBar from '../ui/SearchBar';
import Button from '../ui/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { Images } from '@/lib/staticAssetExports';
import { CommonStaticElementProps } from '@/constants/types';
import { HomeTexts } from '@/constants/texts';
import Toast from 'react-native-toast-message';
import { useLanguage } from '@/contexts/LanguageContext';
export default function RootHeader({ language, colorScheme }: CommonStaticElementProps) {
  const { toggleColorScheme } = useColorScheme();
  const { setLanguage } = useLanguage();
  return (
    <View className={Platform.OS === 'ios' ? 'root-header-ios' : 'root-header-android'}>
      <Image
        source={colorScheme === 'dark' ? Images.logo_white : Images.logo_black}
        className=" basis-2/12"
        resizeMode="contain"
      />
      <SearchBar
        placeholder={HomeTexts.search.placeholder[language]}
        colorScheme={colorScheme}
        onSearch={(query) => {
          console.log(query);
        }}
      />
      <Button
        onPress={() => {
          toggleColorScheme();
          if (language === 'EN') {
            setLanguage('HU');
          } else {
            setLanguage('EN');
          }
        }}
        className="chat-button"
      >
        <MaterialCommunityIcons name="chat-outline" size={32} color={colorScheme === 'light' ? 'black' : 'white'} />
      </Button>
    </View>
  );
}
