import { StatusBar } from 'expo-status-bar';
import {
  Button,
  FlatList,
  HStack,
  ScrollView,
  Switch,
  Text,
  VStack,
  useTheme,
} from 'native-base';
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
import { reportsAxios } from 'src/services/reports';
import { IReports } from 'src/services/reports/reportsDTO';
import { Loading } from 'src/components/Loading';
import { machineAxios } from 'src/services/machine';
import { IFindByIdResponse } from 'src/services/machine/machineDTO';
import { InputTextForm } from 'src/components/form/InputTextForm';
import { LabelForm } from 'src/components/form/LabelForm';
import { InputComposed } from 'src/components/form/InputComposed';
import { useAuth } from 'src/hooks/auth';
import { useToast } from 'src/hooks/toast';

type RouteParams = {
  report_id: string;
  machine_id: string;
};

export const ReportsHome = () => {
  const route = useRoute();
  const { addToast } = useToast();

  const { colors } = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();

  const { report_id, machine_id } = route.params as RouteParams;

  const reportsApi = reportsAxios();
  const machineApi = machineAxios();

  const [report, setReport] = useState<IReports | null>(null);
  const [machine, setMachine] = useState<IFindByIdResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadingReport, setLoadingReport] = useState(true);

  async function loadReportData() {
    try {
      setLoadingReport(true);

      const response = await reportsApi.findById(report_id);
      setReport(response);

      setLoadingReport(false);
    } catch {
      addToast({
        title: 'Ocorreu um erro',
        description: 'Erro ao obter os relatórios',
        status: 'error',
      });
    }
  }

  function handleNavigateToBack() {
    navigation.goBack();
  }

  function handleEditReports() {
    if (!report?.id) return;

    navigation.navigate('EditReport', {
      machine_id: report.machine_id,
      report_id: report.id,
      data: report || undefined,
    });
  }

  async function handleLockReport() {
    try {
      await reportsApi.update(report_id, { locked: true });

      await loadReportData();
    } catch {
      addToast({
        title: 'Ocorreu um erro',
        description: 'Erro ao atualizar relatório',
        status: 'error',
      });
    }
  }

  //load machine reports
  useFocusEffect(
    React.useCallback(() => {
      async function loadMachineReports() {
        setLoading(true);

        await loadReportData();
        const machine = await machineApi.findById(machine_id);

        setMachine(machine);

        setLoading(false);
      }

      loadMachineReports();
    }, [])
  );

  return (
    <VStack flex={1} bg={'primary.700'} p={5}>
      <StatusBar style="light" />

      {loading || loadingReport ? (
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
                Relatório
              </Text>
              <Text fontSize={'sm'} color="gray.700" fontWeight={'bold'}>
                {machine?.brand} - {machine?.model}
              </Text>
            </VStack>
            {user && (
              <RectButton enabled={!report?.locked} onPress={handleEditReports}>
                <Feather
                  name="edit"
                  size={24}
                  color={report?.locked ? colors.gray[500] : colors.black}
                />
              </RectButton>
            )}
          </HStack>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* SECTION EQUIPAMENT */}

            <LabelForm label="Equipamento" />

            <InputTextForm
              label="Tipo de instalação"
              editable={false}
              value={report?.type_instalation || ''}
            />

            <InputTextForm
              label="Ar condicionado"
              editable={false}
              value={report?.type_air_conditioning || ''}
            />

            <InputComposed label="Sistema selado?">
              <Switch
                colorScheme={'red'}
                isChecked={report?.hermetically_sealed}
                isDisabled
              />
            </InputComposed>

            {/* SECTION FLUID */}

            <LabelForm label="Fluido" />

            <InputTextForm
              label="Existente na instalação"
              editable={false}
              value={report?.fluid_existent || ''}
            />

            <InputTextForm
              label="Tipo de intervenção"
              editable={false}
              value={report?.type_intervention || ''}
            />

            <InputTextForm
              label="Fluido carregado"
              editable={false}
              value={report?.fluid_charged || ''}
            />

            <InputTextForm
              label="Descrição"
              editable={false}
              value={report?.fluid_description || ''}
              multiline
            />

            <InputTextForm
              label="Temperatura quente (°C)"
              editable={false}
              value={String(report?.temp_heat || '')}
            />

            <InputTextForm
              label="Temperatura frio (°C)"
              editable={false}
              value={String(report?.temp_cold || '')}
            />

            {/* SECTION OPINION */}

            <LabelForm label="Opinião" />

            <InputTextForm
              label="Cliente"
              editable={false}
              value={String(report?.satisfied ? 'Satisfeito' : 'Insatisfeito')}
            />
          </ScrollView>
        </>
      )}

      {user && (
        <HStack position={'absolute'} bottom={1} right={10}>
          <Button
            bg="transparent"
            _pressed={{ bg: 'transparent' }}
            onPress={handleLockReport}
            isDisabled={report?.locked}
          >
            <Feather
              name={report?.locked ? 'lock' : 'unlock'}
              size={32}
              color={colors.red[500]}
            />
          </Button>
        </HStack>
      )}
    </VStack>
  );
};
