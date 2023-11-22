import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { HStack, Text, VStack } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { formatDateWithHour } from 'src/utils/formatDate';
import { IReports } from 'src/services/reports/reportsDTO';

interface Props extends RectButtonProps {
  data: IReports;
}

export function Reports({ data, ...rest }: Props) {
  const navigation = useNavigation();

  function handleNavigateReport() {
    navigation.navigate('ReportsHome', {
      machine_id: data.machine_id,
      report_id: data.id,
    });
  }

  return (
    <RectButton {...rest} onPress={handleNavigateReport}>
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
                Intervenção
              </Text>
              <Text fontSize={'sm'} fontWeight={'bold'} color="primary.600">
                {formatDateWithHour(data.created_at)}
              </Text>
            </VStack>

            <VStack>
              <Text fontSize={'sm'} color="gray.500">
                Tipo de Intervenção
              </Text>
              <Text fontSize={'sm'} color="primary.600" fontWeight={'bold'}>
                {data.type_intervention}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </RectButton>
  );
}
