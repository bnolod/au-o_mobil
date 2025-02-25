import Input from '@/components/ui/Input';
import { AuthTexts } from '@/constants/texts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform, ScrollView, View } from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import ThemedText from '@/components/ui/ThemedText';
import { useFormContext } from '@/contexts/FormContext';
import { useEffect, useState } from 'react';
import { handleFormInputChange } from '@/lib/functions';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React from 'react';
import { useColorScheme } from 'nativewind';
import { Colors } from '@/constants/Colors';
import Button from '@/components/ui/Button';
export default function Register() {
  const { setFormData, getFormData } = useFormContext();
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  useEffect(() => {
    setFormData('register', {
      email: getFormData('register')?.email || '',
      username: getFormData('register')?.username || '',
      nickname: getFormData('register')?.nickname || '',
      password: getFormData('register')?.password || '',
      confirmPassword: getFormData('register')?.confirmPassword || '',
      dateOfBirth: getFormData('register')?.dateOfBirth || '2007-01-01T00:00:00.000Z',
    });
  }, []);

  const [date, setDate] = useState<Date>();

  const onChange = (_: any, selectedDate: any) => {
    setDate(selectedDate);
    handleFormInputChange('register', 'dateOfBirth', selectedDate.toISOString(), getFormData, setFormData);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date || new Date(2007, 0, 1),
      onChange,
      display: 'spinner',
      maximumDate: new Date(2007, 12, 31),
      mode: currentMode,
      style: { backgroundColor: Colors.highlight.main },
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never" bounces={false} className="max-w-screen">
      <ThemedText className="text-center text-4xl font-bold mb-5 pt-[50%]">
        {AuthTexts.signup.heroText[language]}
      </ThemedText>
      <Input
        label={AuthTexts.signup.labels.email[language]}
        colorScheme={colorScheme!}
        TextInputProps={{
          keyboardType: 'email-address',
          autoComplete: 'email',
          textContentType: 'emailAddress',
          onChangeText: (text) => handleFormInputChange('register', 'email', text, getFormData, setFormData),
          placeholder: AuthTexts.signup.placeholders.email[language],
        }}
        icon={'email'}
      />
      <View className="flex  mx-auto w-full flex-row justify-between">
        <Input
          colorScheme={colorScheme!}
          containerClassName="w-1/2 pl-[4%] pr-[1%]"
          label={AuthTexts.signup.labels.username[language]}
          TextInputProps={{
            keyboardType: 'default',
            autoComplete: 'username',
            onChangeText: (text) => handleFormInputChange('register', 'username', text, getFormData, setFormData),
            textContentType: 'username',
            placeholder: AuthTexts.signup.placeholders.username[language],
          }}
          icon={'account'}
        />
        <Input
          colorScheme={colorScheme!}
          containerClassName="w-1/2 pr-[4%] pl-[1%]"
          label={AuthTexts.signup.labels.nickname[language]}
          TextInputProps={{
            keyboardType: 'default',
            autoComplete: 'username',
            onChangeText: (text) => handleFormInputChange('register', 'nickname', text, getFormData, setFormData),
            textContentType: 'username',
            placeholder: AuthTexts.signup.placeholders.nickname[language],
          }}
          icon={'account'}
        />
      </View>
      <View className="flex  mx-auto w-full flex-row justify-between">
        <Input
          colorScheme={colorScheme!}
          containerClassName="w-1/2 pl-[4%] pr-[1%]" //kiszámoltam, nem random szám!!
          label={AuthTexts.signup.labels.password[language]}
          icon={'lock'}
          secureTextEntry
          TextInputProps={{
            onChangeText: (text) => handleFormInputChange('register', 'password', text, getFormData, setFormData),
            placeholder: AuthTexts.signup.placeholders.password[language],
            autoComplete: 'off',
            textContentType: 'password',
          }}
        />
        <Input
          colorScheme={colorScheme!}
          containerClassName="w-1/2 pr-[4%] pl-[1%]" //kiszámoltam, nem random szám!!
          label={AuthTexts.signup.labels.confirmPassword[language]}
          secureTextEntry
          TextInputProps={{
            onChangeText: (text) =>
              handleFormInputChange('register', 'confirmPassword', text, getFormData, setFormData),
            autoComplete: 'off',
            textContentType: 'password',
            numberOfLines: 1,
            placeholder: AuthTexts.signup.placeholders.confirmPassword[language],
          }}
          icon={'lock-check'}
        />
      </View>
      <View className="w-full mx-auto flex items-center flex-1">
        {Platform.OS === 'ios' ? (
          <RNDateTimePicker
            accentColor={Colors.dark.secondary}
            mode="date"
            display="spinner"
            maximumDate={new Date(2007, 12, 31)}
            value={new Date(2007, 0, 1)}
            onChange={(_, date) => {
              handleFormInputChange('register', 'dateOfBirth', date!.toISOString(), getFormData, setFormData);
            }}
          />
        ) : (
          <View className='w-full'>
            <ThemedText className="ml-3 text-lg">
              <MaterialCommunityIcons name="calendar-account-outline" size={22} />{' '}
              {AuthTexts.signup.labels.dateOfBirth[language]}
            </ThemedText>
            <Button
              className="button py-3 primary w-11/12 text-center items-center"
              onPress={showDatepicker}
              innerTextClassName="underline tlg"
            >
              {!date ? AuthTexts.signup.placeholders.dateOfBirth[language] : date!.toLocaleDateString()}
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
