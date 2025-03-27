import { Stack } from 'expo-router';
import { RefreshControl } from 'react-native';

export default function GroupLayout() {
  return (
    <>
    <Stack initialRouteName="feed">
      <Stack.Screen name="feed" options={{ headerShown: false }} />
      <Stack.Screen name="new" options={{ headerShown: false }} />
    </Stack>
    </>
  );
}
