import { Colors } from '@/constants/Colors';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UserLoading() {
  return (
    <SafeAreaView>
      <ActivityIndicator size="large" color={Colors.highlight.main} />
    </SafeAreaView>
  );
}
