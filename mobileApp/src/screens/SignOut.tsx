import React, { useCallback } from 'react';

import { View, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from 'src/hooks/auth';

export const SignOut = () => {
  const { signOut } = useAuth();

  const navigation = useNavigation();

  async function handleSignoutAxios() {
    signOut();
  }

  function handleSignOut() {
    Alert.alert('Sair', `Deseja sair?`, [
      {
        text: 'Não',
        style: 'cancel',
        onPress: () => {
          navigation.goBack();
        },
      },
      {
        text: 'Sim',
        onPress: async () => {
          handleSignoutAxios();
        },
      },
    ]);
  }

  useFocusEffect(
    useCallback(() => {
      handleSignOut();
    }, [])
  );

  return <View></View>;
};
