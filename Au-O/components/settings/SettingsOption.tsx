import { CommonStaticElementProps } from '@/constants/types';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import { Text, TouchableOpacity, View } from 'react-native';
import ThemedText from '../ui/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SettingsOption } from './props';

export default function SettingsOptionDisplay({
  title,
  icon,
  onPress,
  colorScheme,
  className,
}: SettingsOption & CommonStaticElementProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className=" flex flex-row items-center mx-auto w-11/12 py-3 border-b border-slate-600 justify-start gap-2 primary">
        <MaterialCommunityIcons name={icon} size={38} color={colorScheme === 'light' ? 'black' : 'white'} />
        <ThemedText className={`text-right text-xl ${className}`}>{title}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}
