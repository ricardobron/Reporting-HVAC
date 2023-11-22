import { Feather } from '@expo/vector-icons';
import { HStack, VStack, useTheme } from 'native-base';
import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Input as InputText } from 'native-base';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { colors } = useTheme();

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <HStack mb="4">
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

      <HStack flex={1} rounded={'md'}>
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
          _focus={{ bg: colors.secondary[700], rounded: 'none' }}
          borderBottomColor={isFocused ? colors.red[500] : undefined}
          borderBottomWidth={isFocused ? 2 : undefined}
          secureTextEntry={isPasswordVisible}
          autoCorrect={false}
          {...rest}
        />

        <BorderlessButton onPress={handlePasswordVisibilityChange}>
          <VStack
            isFocused={isFocused}
            h={50}
            w={50}
            justifyContent={'center'}
            alignItems={'center'}
            bg={colors.secondary[700]}
            borderBottomColor={isFocused ? colors.red[500] : undefined}
            borderBottomWidth={isFocused ? 2 : undefined}
          >
            <Feather
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              size={24}
              color={colors.gray[500]}
            />
          </VStack>
        </BorderlessButton>
      </HStack>
    </HStack>
  );
}
