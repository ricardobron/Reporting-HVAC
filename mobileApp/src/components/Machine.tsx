import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { HStack, Text, VStack } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { IFindResponse as IMachines } from 'src/services/machine/machineDTO';

interface Props extends RectButtonProps {
  data: IMachines;
}

export function Machine({ data, ...rest }: Props) {
  const navigation = useNavigation();

  function handleNavigateMachine() {
    navigation.navigate('MachineHome', {
      machine_id: data.id,
      company_id: data.company_id,
    });
  }

  return (
    <RectButton {...rest} onPress={handleNavigateMachine}>
      <VStack
        w="full"
        h={'20'}
        bg="secondary.700"
        flexDirection={'row'}
        p={4}
        mb={6}
      >
        <VStack flex="1">
          <HStack
            justifyContent={'space-between'}
            alignItems={'center'}
            flex={1}
          >
            <VStack>
              <Text fontSize={'sm'} color="gray.500">
                Marca
              </Text>
              <Text fontSize={'sm'} fontWeight={'bold'} color="primary.600">
                {data.brand}
              </Text>
            </VStack>

            <VStack>
              <Text fontSize={'sm'} color="gray.500">
                Modelo
              </Text>
              <Text fontSize={'sm'} color="primary.600" fontWeight={'bold'}>
                {data.model}
              </Text>
            </VStack>

            <VStack>
              <Text fontSize={'sm'} color="gray.500">
                Serie
              </Text>
              <Text fontSize={'sm'} color="primary.600" fontWeight={'bold'}>
                {data.serie}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </RectButton>
  );
}
