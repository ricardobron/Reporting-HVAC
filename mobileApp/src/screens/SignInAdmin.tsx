import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import { Text, VStack, useTheme } from 'native-base';
import { Input } from '../components/Input';
import { PasswordInput } from '../components/PasswordInput';
import { Button } from '../components/Button';
import { useAuth } from 'src/hooks/auth';

export function SignInAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const { signInAdmin, loading } = useAuth();

  const { colors } = useTheme();

  // async function handleSignIn() {
  //   try {
  //     const schema = Yup.object().shape({
  //       email: Yup.string()
  //         .required('E-mail obrigatório')
  //         .email('Digite um e-mail válido'),
  //       password: Yup.string()
  //         .required('A senha é obrigatória')
  //     });

  //     await schema.validate({ email, password });

  //     signIn({ email, password });
  //   } catch (error) {
  //     if (error instanceof Yup.ValidationError) {
  //       Alert.alert('Opa', error.message);
  //     } else {
  //       Alert.alert(
  //         'Erro na autenticação',
  //         'Ocorreu um erro ao fazer login, verifique as credenciais'
  //       )
  //     }
  //   }
  // }

  async function handleSignAdmin() {
    await signInAdmin({ email, password });
  }

  return (
    <VStack flex="1" bg={colors.primary[700]}>
      <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <VStack px={10} pt={10}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor="transparent"
              translucent
            />

            <VStack w="full" mt={50}>
              <Text
                fontSize={40}
                fontWeight={'bold'}
                color={colors.secondary[600]}
                lineHeight={40}
              >
                Entre como{'\n'}administrador.
              </Text>
              <Text
                fontSize={15}
                color={colors.gray[700]}
                lineHeight={25}
                mt="8"
              >
                Faça seu login para começar{'\n'}
                uma experiência incrível.
              </Text>
            </VStack>

            <VStack w="full" my="32">
              <Input
                iconName="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
              />

              <PasswordInput
                iconName="lock"
                placeholder="Senha"
                onChangeText={setPassword}
                value={password}
              />

              <VStack mt="1">
                <Button
                  title="Login"
                  onPress={handleSignAdmin}
                  isDisabled={loading}
                  loading={loading}
                />
              </VStack>
            </VStack>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </VStack>
  );
}
