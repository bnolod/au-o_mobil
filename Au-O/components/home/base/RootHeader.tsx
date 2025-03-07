import { Platform, View } from 'react-native';
import SearchBar from '@/components/ui/SearchBar';
import Button from '@/components/ui/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Images } from '@/lib/staticAssetExports';
import { CommonStaticElementProps } from '@/constants/types';
import { HomeTexts } from '@/constants/texts';
import { Image } from 'expo-image';
import GradientBackground from '@/components/ui/GradientBackground';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

export default function RootHeader({ language, colorScheme }: CommonStaticElementProps) {
  return (
    <GradientBackground colors={[Colors[colorScheme].primary, Colors[colorScheme].secondary]} start = {[0, 0]} end = {[1, 1]} >
    <View className={" " + Platform.OS === 'ios' ? 'root-header-ios' : 'root-header-android'}>
      
        <Image
          source={colorScheme === 'dark' ? Images.logo_white : Images.logo_black}
          style={{ flexBasis: 'auto', width: 72, height: 32 }}
          contentFit="contain"
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
            router.push("/chat")}}
          className=""
        >
          <MaterialCommunityIcons name="chat-outline" size={32} color={colorScheme === 'light' ? 'black' : 'white'} />
        </Button>
    </View>
      </GradientBackground>
  );
}
