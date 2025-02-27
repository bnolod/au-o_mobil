import { View } from 'react-native';
import Button from '../ui/Button';
import ThemedText from '../ui/ThemedText';
import { AuthTexts } from '@/constants/texts';
import { useFormContext } from '@/contexts/FormContext';
import { router } from 'expo-router';
import { showErrorToast } from '@/lib/functions';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { validateLogin, validateRegister } from '@/lib/Validation/Validation';
import { loginFailed } from '@/lib/Validation/responses';

export default function AuthTouchables({ language, mode }: { language: 'HU' | 'EN'; mode: 'LOGIN' | 'SIGNUP' }) {
  const { getFormData, resetFormData } = useFormContext();
  const { login, register } = useAuthentication();
  async function performLogin() {
    const { identifier, password } = await getFormData('login');
      if (!validateLogin(identifier, password, language).valid) {
        return;
    }
    resetFormData('login');
    const loginStatus = await login!({ usernameOrEmail: identifier, password });
    if (loginStatus) {
      router.replace('/(root)/home');
    } else
    showErrorToast(loginFailed[language], );
  }
  async function performRegistration() {
    const { email, username, password, nickname, confirmPassword, dateOfBirth } = await getFormData('register');
      if (!validateRegister(email, username, password, nickname, confirmPassword, dateOfBirth, language).valid) {
        return;
      }
      resetFormData('register');
    await register!({
      email,
      username,
      password,
      nickname,
      dateOfBirth: dateOfBirth.split('T')[0],
    });
    router.replace('/(root)/home');
    resetFormData('register');
  }
  return (
    <View className="w-full basis-2/12 sticky flex flex-col my-6 bg-transparent justify-evenly items-center">
      <Button
        className="button highlight btn-fill"
        innerTextClassName="txl"
        hapticFeedback="heavy"
        onPress={
          mode === 'LOGIN'
            ? () => {
                performLogin();
              }
            : () => {
                performRegistration();
              }
        }
      >
        {mode === 'LOGIN' ? AuthTexts.login.confirm[language] : AuthTexts.signup.confirm[language]}
      </Button>
      <View className="flex items-center flex-row">
        <ThemedText>
          {mode === 'LOGIN' ? AuthTexts.login.notRegistered[language] : AuthTexts.signup.haveAccount[language]}
        </ThemedText>
        <Button
          hapticFeedback="light"
          type="fit"
          variant="transparent"
          onPress={() => {
            router.replace(mode === 'LOGIN' ? '/(auth)/register' : '/(auth)/login');
          }}
        >
          <ThemedText className="underline font-bold">
            {mode === 'LOGIN'
              ? AuthTexts.login.confirmTabSwitch[language]
              : AuthTexts.signup.confirmTabSwitch[language]}
          </ThemedText>
        </Button>
      </View>
    </View>
  );
}
