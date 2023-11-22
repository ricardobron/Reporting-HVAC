import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { Text, VStack, useTheme } from 'native-base';
import { PasswordInput } from '../components/PasswordInput';
import { Button } from '../components/Button';
import { useAuth } from 'src/hooks/auth';

export function SignInCompany() {
  const [codeCompany, setCodeCompany] = useState('');

  const { signInCompany, loading } = useAuth();

  const { colors } = useTheme();

  async function handleSignInCompany() {
    await signInCompany({ code: codeCompany });
  }

  return (
    <VStack flex="1" bg={colors.primary[700]}>
      <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <VStack px={12}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor="transparent"
              translucent
            />

            <VStack w="full" mt="100">
              <Text
                fontSize={40}
                fontWeight={'bold'}
                color={colors.secondary[600]}
                lineHeight={40}
              >
                Entre como{'\n'}empresa.
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
              <PasswordInput
                iconName="lock"
                placeholder="Código Empresa"
                onChangeText={setCodeCompany}
                value={codeCompany}
              />

              <VStack>
                <Button
                  title="Login"
                  onPress={handleSignInCompany}
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
