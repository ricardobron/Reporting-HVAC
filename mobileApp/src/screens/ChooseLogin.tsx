import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import { VStack, useTheme } from 'native-base';

import { Button } from '../components/Button';

export function ChooseLogin() {
  const navigation = useNavigation();

  const { colors } = useTheme();

  function handleNavigateSignInAdmin() {
    navigation.navigate('SignInAdmin');
  }

  function handleNavigateSignInCompany() {
    navigation.navigate('SignInCompany');
  }

  return (
    <VStack
      flex="1"
      justifyContent={'center'}
      alignItems={'center'}
      bg={colors.primary[600]}
    >
      <VStack px={12}>
        <StatusBar backgroundColor="white" translucent />

        <VStack>
          <Button
            title="Entre como administrador"
            onPress={handleNavigateSignInAdmin}
          />

          <Button
            title="Entre como empresa"
            onPress={handleNavigateSignInCompany}
          />
        </VStack>
      </VStack>
    </VStack>
  );
}
