/**
 * Egy szöveg szerkesztő modális ablak
 * @module home/base/TextEditModal
 */

import { CommonStaticElementProps } from '@/constants/types';
import { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Input from '@/components/ui/Input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ThemedText from '@/components/ui/ThemedText';
import { EditModalTexts } from '@/constants/texts';
import { TextEditModalProps } from './props';

/**
 * 
 * @param {TextEditModalProps} props Tulajdonságok
 * @returns 
 */
export default function TextEditModal({
  initialValue,
  onSave,
  onCancel,
  visible,
  labelComponent,
  colorScheme,
  language,
  lines,
  placeholder,
}: TextEditModalProps & CommonStaticElementProps) {
  const [value, setValue] = useState<string>(initialValue || '');
  function handleCancelIos() {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
      return;
    }
    if (value === initialValue) {
      onCancel && onCancel();
    } else
      Alert.alert(EditModalTexts.alert.title[language], EditModalTexts.alert.subheading[language], [
        {
          text: EditModalTexts.alert.discard[language],
          style: 'destructive',
          onPress: () => {
            onCancel && onCancel();
          },
        },
        {
          text: EditModalTexts.alert.keepEditing[language],
          onPress: () => {
            return;
          },
          isPreferred: true,
        },
      ]);
  }
  if (Platform.OS === 'ios') {
    return (
      <Modal visible={visible} animationType="fade" transparent={true}>
        <ScrollView
          overScrollMode="never"
          bounces={false}
          scrollEnabled={false}
          className=" bg-black/50"
          style={{ flex: 1 }}
        >
          <KeyboardAvoidingView
            style={{
              flex: 1,
            }}
            behavior="position"
          >
            <TouchableOpacity onPress={handleCancelIos} className="text-edit-modal">
              <Input
                TextInputProps={{
                  value: value,
                  onChangeText: setValue,
                  placeholder: placeholder,
                  multiline: lines && lines > 1 ? true : false,
                  numberOfLines: lines || 1,
                  style: {
                    height: lines ? lines * 40 : 40,
                  },
                  autoFocus: true,
                }}
                containerClassName={`w-11/12 h-screen flex justify-center items-center m-auto`}
                label={labelComponent}
                colorScheme={colorScheme}
              />
            </TouchableOpacity>

            <TouchableWithoutFeedback
              onPress={() => {
                onSave(value);
                setValue('');
              }}
            >
              <ThemedText className="p-3 mt-12text-xl absolute font-bold w-full text-center rounded-xl bottom-12 bg-highlight">
                {EditModalTexts.save[language]}
              </ThemedText>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
    );
  } else
    return (
      <Modal transparent={true} visible={visible} animationType="fade">
        <ScrollView
          overScrollMode="never"
          bounces={false}
          scrollEnabled={false}
          className="bg-black/50 flex h-screen-safe w-full"
        >
          <Pressable onPress={() => handleCancelIos()} className=" h-screen w-full flex-col flex justify-center items-center">
            <View className="flex items-center w-5/6">
              <Input

                TextInputProps={{
                  value: value,
                  onChangeText: setValue,
                  placeholder: placeholder,
                  multiline: lines && lines > 1 ? true : false,
                  numberOfLines: lines || 1,
                  style: {
                    height: lines ? lines * 40 : 40,
                  },
                  autoFocus: true,
                }}
                containerClassName={`basis-1/3 w-full`}
                label={labelComponent}
                colorScheme={colorScheme}
              />

              <TouchableWithoutFeedback
              className='w-full'
                onPress={() => {
                  onSave(value);
                  setValue('');
                }}
              >
                <ThemedText className='button highlight-themed btn-fill text-center'>
                  {EditModalTexts.save[language]}
                </ThemedText>
              </TouchableWithoutFeedback>
            </View>
          </Pressable>
        </ScrollView>
      </Modal>
    );
}
