import { useTheme } from 'native-base';
import { ActivityIndicator } from 'react-native';

export function Loading() {
  const { colors } = useTheme();

  return (
    <ActivityIndicator
      color={colors.red[500]}
      size="large"
      style={{ flex: 1 }}
    />
  );
}
