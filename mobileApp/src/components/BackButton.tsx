import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'native-base';

interface Props {
  color?: string;
  onPress: () => void;
}

export function BackButton({ color, onPress, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons
        name="chevron-left"
        size={32}
        color={color ? color : colors.gray[600]}
      />
    </TouchableOpacity>
  );
}
