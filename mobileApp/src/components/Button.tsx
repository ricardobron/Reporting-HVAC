import { Text, useTheme } from 'native-base';
import { ActivityIndicator } from 'react-native';

import { Button as NativeButton, IButtonProps } from 'native-base';
import { isLoading } from 'expo-font';

interface Props extends IButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  disabled,
  isLoading,
  light = false,
  ...rest
}: Props) {
  const { colors } = useTheme();

  return (
    <NativeButton
      mt="3"
      backgroundColor={color ? color : colors.red[500]}
      w={'full'}
      p={4}
      alignItems={'center'}
      justifyContent={'center'}
      onPress={onPress}
      disabled={disabled}
      isLoading={isLoading}
      style={{ opacity: !disabled === false || isLoading === true ? 0.5 : 1 }}
      _pressed={{ bg: colors.red[400] }}
      isLoadingText={title}
      {...rest}
    >
      <Text color={light ? colors.primary[600] : colors.gray[100]}>
        {title}
      </Text>
    </NativeButton>
  );
}
