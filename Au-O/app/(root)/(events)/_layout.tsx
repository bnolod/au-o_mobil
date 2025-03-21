import Footer from '@/components/ui/Footer';
import { Stack } from 'expo-router';

export default function EventLayout() {
  return (
    <>
      <Stack initialRouteName="feed">
        <Stack.Screen name="feed" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
