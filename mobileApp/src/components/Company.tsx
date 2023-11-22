import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { HStack, Text, VStack } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { formatDateWithHour } from 'src/utils/formatDate';
import { IFindResponse } from 'src/services/company/companyDTO';

interface Props extends RectButtonProps {
  data: IFindResponse;
}

export function Company({ data, ...rest }: Props) {
  const navigation = useNavigation();

  function handleNavigateCompany() {
    navigation.navigate('CompanyHome', { company_id: data.id });
  }

  return (
    <RectButton {...rest} onPress={handleNavigateCompany}>
      <VStack
        w="full"
        h={'32'}
        bg="secondary.700"
        flexDirection={'row'}
        p={4}
        mb={6}
      >
        <VStack flex="1" justifyContent={'space-between'}>
          {/* LINE UP */}
          <HStack justifyContent={'space-between'}>
            <VStack>
              <Text fontSize={'sm'} color="gray.500">
                Empresa
              </Text>
              <Text fontSize={'sm'} fontWeight={'bold'} color="primary.600">
                {data.name}
              </Text>
            </VStack>

            <VStack>
              <Text fontSize={'sm'} color="gray.500">
                Máquinas
              </Text>
              <Text fontSize={'sm'} color="red.500" fontWeight={'bold'}>
                {data.machines_count}
              </Text>
            </VStack>
          </HStack>

          {/* LINE DOWN */}
          <HStack justifyContent={'space-between'}>
            <VStack>
              <Text fontSize={'sm'} color="gray.500">
                Última atualização
              </Text>
              <Text fontSize={'sm'} fontWeight={'bold'} color="primary.600">
                {formatDateWithHour(data.updated_at)}
              </Text>
            </VStack>

            <VStack>
              <Text fontSize={'sm'} color="gray.500">
                Relatórios
              </Text>
              <Text fontSize={'sm'} color="red.500" fontWeight={'bold'}>
                {data.reports_count}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </RectButton>
  );
}
