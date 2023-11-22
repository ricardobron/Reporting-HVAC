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
import { Reports } from 'src/components/Reports';
import { RectButton } from 'react-native-gesture-handler';
import { IFindByIdResponse as IMachine } from 'src/services/machine/machineDTO';
import { IReports } from 'src/services/reports/reportsDTO';

import { machineAxios } from 'src/services/machine';
import { Loading } from 'src/components/Loading';
import { reportsAxios } from 'src/services/reports';

import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

import { Alert, Platform } from 'react-native';
import { useAuth } from 'src/hooks/auth';
import { useToast } from 'src/hooks/toast';

type RouteParams = {
  machine_id: string;
  company_id: string;
};

export const MachineHome = () => {
  const route = useRoute();
  const { addToast } = useToast();

  const { colors } = useTheme();
  const navigation = useNavigation();
  const { user, token } = useAuth();

  const machineApi = machineAxios();
  const reportsApi = reportsAxios();

  const { machine_id } = route.params as RouteParams;

  const [machine, setMachine] = useState<IMachine | null>(null);
  const [machineReports, setMachineReports] = useState<IReports[]>([]);

  const [loadingMachine, setLoadingMachine] = useState(true);
  const [loadingReports, setLoadingReports] = useState(true);

  function handleNavigateToBack() {
    navigation.goBack();
  }

  function handleEditMachine() {
    if (!machine) return;

    navigation.navigate('EditMachine', {
      machine_id: machine.id,
      company_id: machine.company_id,
      data: machine,
    });
  }

  function handleCreateReport() {
    navigation.navigate('EditReport', { machine_id });
  }

  const save = async (uri: string, filename: string, mimetype: string) => {
    if (Platform.OS === 'android') {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) =>
            Alert.alert(
              `Ocorreu um ao transferir o QrCode`,
              `Tente este link ${machineApi.printLabelToPdf(machine_id)}`
            )
          );
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

  async function handlePrintMachineCode() {
    const remoteUrl = machineApi.printLabelToPdf(machine_id);

    try {
      const filename = `qrcode-${machine?.id}.pdf`;
      const result = await FileSystem.downloadAsync(
        remoteUrl,
        FileSystem.documentDirectory + filename,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.status !== 200) {
        alert('Erro fazer download ficheiro de QR-Code');

        return;
      }

      save(result.uri, filename, result.headers['Content-Type']);
    } catch {
      alert('Erro ao obter ficheiro de QR-Code');
    }
  }

  //load machine
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      async function loadMachine() {
        try {
          setLoadingMachine(true);

          const response = await machineApi.findById(machine_id);

          if (isActive) {
            setMachine(response);
            setLoadingMachine(false);
          }
        } catch {
          addToast({
            title: 'Ocorreu um erro',
            description: 'Erro ao obter os dados da máquina',
            status: 'error',
          });
        }
      }

      loadMachine();

      return () => {
        isActive = false;
      };
    }, [])
  );

  async function loadMachineReports() {
    try {
      setLoadingMachine(true);

      const response = await reportsApi.find(machine_id);

      setMachineReports(response);
      setLoadingReports(false);
    } catch {
      addToast({
        title: 'Ocorreu um erro',
        description: 'Erro ao obter os relatórios',
        status: 'error',
      });
    }
  }

  //load machine reports
  useFocusEffect(
    React.useCallback(() => {
      async function loadData() {
        await loadMachineReports();
      }

      loadData();
    }, [])
  );

  return (
    <VStack flex={1} bg={'primary.700'} p={5}>
      <StatusBar style="light" />

      {loadingMachine ? (
        <Loading />
      ) : (
        <>
          {/* HEADER */}
          <HStack w="full" mt="6" py="3" alignItems={'center'}>
            <BackButton onPress={handleNavigateToBack} />
            <VStack
              flex={1}
              ml="4"
              textAlign={'center'}
              justifyContent={'center'}
            >
              <Text fontSize={'sm'} color="gray.500">
                Marca
              </Text>
              <Text fontSize={'sm'} color="gray.700" fontWeight={'bold'}>
                {machine?.brand}
              </Text>
            </VStack>
            {user && (
              <RectButton onPress={handleEditMachine}>
                <Feather name="edit" size={24} />
              </RectButton>
            )}
          </HStack>

          <HStack justifyContent={'space-between'} mt="4">
            <CardInfo
              name="Relatórios"
              icon="ballot"
              value={String(machine?.reports_count)}
            />

            <CardInfo
              name="Últ. Relatório"
              icon="clock"
              value={formatDate(machine?.last_report || new Date())}
            />
          </HStack>

          <FlatList
            mt="4"
            ListHeaderComponent={
              <Text mb="2" fontWeight={'bold'}>
                Relatórios
              </Text>
            }
            ListEmptyComponent={<Text mb="2">Não existem relatórios</Text>}
            refreshing={loadingReports}
            showsVerticalScrollIndicator={false}
            data={machineReports}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Reports data={item} />}
          />
        </>
      )}

      <HStack position={'absolute'} bottom={1} right={10}>
        {user && (
          <Button
            bg="transparent"
            _pressed={{ bg: 'transparent' }}
            onPress={handleCreateReport}
          >
            <Feather name="plus-circle" size={32} color={colors.red[500]} />
          </Button>
        )}
        <Button
          bg="transparent"
          _pressed={{ bg: 'transparent' }}
          onPress={handlePrintMachineCode}
        >
          <Feather name="printer" size={32} color={colors.red[500]} />
        </Button>
      </HStack>
    </VStack>
  );
};
