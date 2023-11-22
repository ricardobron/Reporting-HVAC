import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInputProps } from 'react-native';

import { HStack, Input as InputText, useTheme, VStack } from 'native-base';

interface Props extends TextInputProps {
  iconName?: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function Input({ iconName, value, ...rest }: Props) {
  const { colors } = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <HStack mb="4">
      {iconName && (
        <VStack
          isFocused={isFocused}
          h={50}
          w={50}
          justifyContent={'center'}
          alignItems={'center'}
          bg={colors.secondary[700]}
          borderBottomColor={isFocused ? colors.red[500] : undefined}
          borderBottomWidth={isFocused ? 2 : undefined}
          mr={1}
        >
          <Feather
            name={iconName}
            size={24}
            color={isFocused || isFilled ? colors.red[500] : colors.gray[500]}
          />
        </VStack>
      )}

      <InputText
        flex="1"
        bg={colors.secondary[700]}
        color={colors.gray[600]}
        fontSize={15}
        px={5}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        borderWidth={0}
        _focus={{ bg: colors.secondary[700] }}
        borderBottomColor={isFocused ? colors.red[500] : undefined}
        borderBottomWidth={isFocused ? 2 : undefined}
        value={value}
        {...rest}
      />
    </HStack>
  );
}
