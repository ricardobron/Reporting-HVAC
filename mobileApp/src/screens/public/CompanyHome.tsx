import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, HStack, Text, VStack, useTheme } from 'native-base';
import React, { useState } from 'react';

import { Feather } from '@expo/vector-icons';
import { BackButton } from 'src/components/BackButton';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { CardInfo } from 'src/components/CardInfo';
import { formatDate } from 'src/utils/formatDate';
import { Machine } from 'src/components/Machine';
import { RectButton } from 'react-native-gesture-handler';
import { IFindResponse as ICompany } from 'src/services/company/companyDTO';
import { IFindResponse as IMachine } from 'src/services/machine/machineDTO';

import { companyAxios } from 'src/services/company';
import { Loading } from 'src/components/Loading';
import { machineAxios } from 'src/services/machine';
import { useAuth } from 'src/hooks/auth';
import { useToast } from 'src/hooks/toast';

type RouteParams = {
  company_id: string;
};

export const CompanyHome = () => {
  const route = useRoute();

  const { colors } = useTheme();
  const navigation = useNavigation();
  const { addToast } = useToast();

  const { user } = useAuth();

  const [company, setCompany] = useState<ICompany | null>(null);
  const [machines, setMachines] = useState<IMachine[]>([]);

  const [loadingCompany, setLoadingCompany] = useState(true);
  const [loadingMachines, setLoadingMachines] = useState(true);

  const companyApi = companyAxios();
  const machineApi = machineAxios();

  const { company_id } = route.params as RouteParams;

  function handleNavigateToBack() {
    navigation.goBack();
  }

  function handleEditCompany() {
    if (!company?.id) return;

    navigation.navigate('EditCompany', {
      company_id: company.id,
      data: company,
    });
  }

  function handleCreateMachine() {
    if (!company?.id) return;

    navigation.navigate('EditMachine', { company_id: company?.id });
  }

  //load companyData
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      async function loadCompanys() {
        try {
          setLoadingCompany(true);

          const response = await companyApi.findById(company_id);

          if (isActive) {
            setCompany(response);
            setLoadingCompany(false);
          }
        } catch {
          addToast({
            title: 'Ocorreu um erro',
            description: 'Erro ao obter os dados da empresa',
            status: 'error',
          });
        }
      }

      loadCompanys();

      return () => {
        isActive = false;
      };
    }, [])
  );

  async function loadMachines() {
    try {
      setLoadingMachines(true);

      const response = await machineApi.find(company_id);

      setMachines(response);
      setLoadingMachines(false);
    } catch {
      addToast({
        title: 'Ocorreu um erro',
        description: 'Erro ao obter os dados das máquinas',
        status: 'error',
      });
    }
  }

  //load machineData
  useFocusEffect(
    React.useCallback(() => {
      async function loadData() {
        loadMachines();
      }

      loadData();
    }, [])
  );

  return (
    <VStack flex={1} bg={'primary.700'} p={5}>
      <StatusBar style="light" />

      {loadingCompany ? (
        <Loading />
      ) : (
        <>
          {/* HEADER */}
          <HStack w="full" mt="6" py="3" alignItems={'center'}>
            {user && <BackButton onPress={handleNavigateToBack} />}
            <VStack
              flex={1}
              ml="4"
              textAlign={'center'}
              justifyContent={'center'}
            >
              <Text fontSize={'sm'} color="gray.500">
                Empresa
              </Text>
              <Text fontSize={'sm'} fontWeight={'bold'} color="primary.600">
                {company?.name} ({company?.code})
              </Text>
            </VStack>
            {user && (
              <RectButton onPress={handleEditCompany}>
                <Feather name="edit" size={24} />
              </RectButton>
            )}
          </HStack>

          <HStack justifyContent={'space-between'} mt="4">
            <CardInfo
              name="Máquinas"
              icon="factory"
              value={String(company?.machines_count)}
            />

            <CardInfo
              name="Relatórios"
              icon="ballot"
              value={String(company?.reports_count)}
            />

            <CardInfo
              name="Últ. Atualização"
              icon="clock"
              value={formatDate(company?.updated_at || new Date())}
            />
          </HStack>

          <FlatList
            mt="4"
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <Text mb="2" fontWeight={'bold'}>
                Máquinas
              </Text>
            }
            ListEmptyComponent={<Text mb="2">Não existem máquinas</Text>}
            data={machines}
            keyExtractor={(item) => item.id}
            refreshing={loadingMachines}
            onRefresh={loadMachines}
            renderItem={({ item }) => <Machine data={item} />}
          />
        </>
      )}

      {user && (
        <HStack position={'absolute'} bottom={1} right={10}>
          <Button
            bg="transparent"
            _pressed={{ bg: 'transparent' }}
            onPress={handleCreateMachine}
          >
            <Feather name="plus-circle" size={32} color={colors.red[500]} />
          </Button>
        </HStack>
      )}
    </VStack>
  );
};
