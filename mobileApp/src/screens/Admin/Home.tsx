import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, HStack, Text, VStack, useTheme } from 'native-base';
import React, { useState } from 'react';

import { Feather } from '@expo/vector-icons';
import Logo from 'src/assets/LogoSmall.svg';
import { Company } from 'src/components/Company';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { companyAxios } from 'src/services/company';
import { IFindResponse } from 'src/services/company/companyDTO';
import { Loading } from 'src/components/Loading';
import { useToast } from 'src/hooks/toast';

export const HomeAdmin = () => {
  const { colors } = useTheme();
  const { addToast } = useToast();

  const navigation = useNavigation();

  const [companys, setCompanys] = useState<IFindResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const companyApi = companyAxios();

  function handleNavigateCreateCompany() {
    navigation.navigate('EditCompany', {});
  }

  async function loadCompanys() {
    try {
      setLoading(true);

      const response = await companyApi.find();

      setCompanys(response);
      setLoading(false);
    } catch {
      addToast({
        title: 'Ocorreu um erro',
        description: 'Erro ao obter os dados das empresas',
        status: 'error',
      });
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      async function loadData() {
        await loadCompanys();
      }

      loadData();
    }, [])
  );

  return (
    <VStack flex={1} bg={'primary.700'}>
      <StatusBar style="light" />

      {/* HEADER */}
      <VStack w="full" h={'32'} bg="primary.600" px={3} py={'10'}>
        <HStack mt="2" justifyContent={'space-between'} alignItems={'center'}>
          <Logo width={108} height={50} />

          <Text fontSize={'md'} color="gray.600">
            Total de {companys.length} empresas
          </Text>
        </HStack>
      </VStack>

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          contentContainerStyle={{ padding: 24 }}
          showsVerticalScrollIndicator={false}
          data={companys}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Company data={item} />}
          refreshing={loading}
          onRefresh={loadCompanys}
        />
      )}

      <HStack position={'absolute'} bottom={1} right={10}>
        <Button
          bg="transparent"
          _pressed={{ bg: 'transparent' }}
          onPress={handleNavigateCreateCompany}
        >
          <Feather name="plus-circle" size={32} color={colors.red[500]} />
        </Button>
      </HStack>
    </VStack>
  );
};
