import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  HStack,
  ScrollView,
  Text,
  VStack,
  useTheme,
  Switch,
  Radio,
  Stack,
} from 'native-base';

import { useForm } from 'react-hook-form';

import { Feather } from '@expo/vector-icons';

import { BackButton } from 'src/components/BackButton';
import { InputTextForm } from 'src/components/form/InputTextForm';

import { useEffect, useState } from 'react';
import { Button } from 'src/components/Button';

import { RectButton } from 'react-native-gesture-handler';
import { InputSelectForm } from 'src/components/form/InputSelectForm';
import { InputComposed } from 'src/components/form/InputComposed';
import { LabelForm } from 'src/components/form/LabelForm';
import {
  ICreateRequest,
  IReports,
  IUpdateRequest,
} from 'src/services/reports/reportsDTO';
import { useGetOptionsReports } from 'src/components/shared/useGetOptionsReport';
import { reportsAxios } from 'src/services/reports';
import { Loading } from 'src/components/Loading';
import { useToast } from 'src/hooks/toast';
import { Alert } from 'react-native';

type RouteParams = {
  machine_id: string;
  report_id?: string;
  data?: IReports;
};

export const EditReport = () => {
  const route = useRoute();
  const { addToast } = useToast();

  const routeParams = route.params as RouteParams;

  const reportsApi = reportsAxios();

  const { data, machine_id, report_id } = routeParams;

  const [hermeticallySealed, setHermeticallySealed] = useState(
    data?.hermetically_sealed || false
  );

  const navigation = useNavigation();

  const {
    optionsAirConditioning,
    loading,
    optionsInstalation,
    optionsTypeFluidExistent,
    optionsTypeIntervention,
  } = useGetOptionsReports();

  const { register, setValue, handleSubmit } = useForm<
    ICreateRequest | IUpdateRequest
  >({
    defaultValues: {
      hermetically_sealed: data?.hermetically_sealed || false,
      satisfied: data?.satisfied || false,
      fluid_charged: data?.fluid_charged || undefined,
      fluid_description: data?.fluid_description || undefined,
      fluid_existent: data?.fluid_existent || '',
      temp_cold: data?.temp_cold || undefined,
      temp_heat: data?.temp_heat || undefined,
      type_air_conditioning: data?.type_air_conditioning || undefined,
      type_instalation: data?.type_instalation || undefined,
      type_intervention: data?.type_intervention || undefined,
    },
  });

  const [typeInstalation, setTypeInstalation] = useState<string | undefined>(
    data?.type_instalation || undefined
  );
  const [typeAirConditioning, setTypeAirConditioning] = useState<
    string | undefined
  >(data?.type_air_conditioning || undefined);

  const [typeFluidExistent, setTypeFluidExistent] = useState<
    string | undefined
  >(data?.type_air_conditioning || undefined);

  const [typeIntervention, setTypeIntervention] = useState<string | undefined>(
    data?.type_intervention || undefined
  );

  function handleChangeTypeInstalation(value: string) {
    setValue('type_instalation', value);
    setTypeInstalation(value);
  }

  function handleChangeTypeAirConditioning(value: string) {
    setValue('type_air_conditioning', value);
    setTypeAirConditioning(value);
  }

  function handleChangeTypeExistentFluid(value: string) {
    setValue('fluid_existent', value);
    setTypeFluidExistent(value);
  }

  function handleChangeTypeIntervention(value: string) {
    setValue('type_intervention', value);
    setTypeIntervention(value);
  }

  useEffect(() => {
    register('type_instalation');
    register('type_air_conditioning');
    register('type_intervention');

    register('fluid_existent');
    register('fluid_charged');
    register('fluid_description');

    register('temp_heat');
    register('temp_cold');

    register('hermetically_sealed');
    register('satisfied');
  }, [register]);

  function handleNavigateToBack() {
    navigation.goBack();
  }

  async function handleDeleteMachine() {
    if (!report_id) return;

    try {
      await reportsApi.deleteOne(report_id);

      navigation.goBack();
    } catch {
      return addToast({
        title: 'Ocorreu um erro',
        description: 'Erro ao eliminar relatório',
        status: 'error',
      });
    }
  }

  const showConfirmDialogDeleteReport = () => {
    return Alert.alert(
      'Eliminar relatório?',
      `Tem a certeza que deseja eliminar este relatório?`,
      [
        {
          text: 'Sim',
          onPress: () => {
            handleDeleteMachine();
          },
        },
        {
          text: 'Não',
        },
      ]
    );
  };

  async function onSubmitForm(dataForm: IUpdateRequest | ICreateRequest) {
    try {
      if (!machine_id) return;

      const dataFormated: IUpdateRequest | ICreateRequest = {
        ...dataForm,
        hermetically_sealed: hermeticallySealed,
      };

      if (report_id) {
        const dataToSend = dataFormated as IUpdateRequest;

        const response = await reportsApi.update(report_id, dataToSend);

        navigation.navigate('ReportsHome', {
          machine_id,
          report_id: response.id,
        });
      } else {
        const dataToSend = dataFormated as ICreateRequest;

        const response = await reportsApi.create({ ...dataToSend, machine_id });

        navigation.navigate('ReportsHome', {
          machine_id,
          report_id: response.id,
        });
      }
    } catch {
      addToast({
        title: `Erro ao ${report_id ? 'editar' : 'criar'} relatório`,
        description: 'Tente novamente mais tarde',
        status: 'error',
      });
    }
  }

  return (
    <VStack flex={1} bg={'primary.700'} p={5}>
      <StatusBar style="light" />

      {/* HEADER */}
      <HStack
        w="full"
        mt="6"
        py="3"
        justifyContent={routeParams?.report_id ? 'space-between' : 'flex-start'}
        alignItems={'center'}
      >
        <BackButton onPress={handleNavigateToBack} />

        <Text ml="2">
          {routeParams?.report_id
            ? 'Edição do relatório'
            : 'Criação do relatório'}
        </Text>

        {routeParams?.report_id && (
          <RectButton onPress={showConfirmDialogDeleteReport}>
            <Feather name="trash" size={24} />
          </RectButton>
        )}
      </HStack>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* SECTION EQUIPAMENT */}

          <LabelForm label="Equipamento" />

          <InputSelectForm
            required={!report_id}
            label="Tipo de instalação"
            onValueChange={handleChangeTypeInstalation}
            placeholder={{
              label: 'Selecione um tipo de instalação',
              value: null,
            }}
            value={data?.type_instalation}
            items={optionsInstalation}
          />

          {typeInstalation === 'other' && (
            <InputTextForm
              required={!report_id}
              label="Outro tipo de instalação"
              placeholder="Outro tipo de instalação"
              onChangeText={(value) => setValue('type_instalation', value)}
            />
          )}

          <InputSelectForm
            required={!report_id}
            label="Ar condicionado"
            onValueChange={handleChangeTypeAirConditioning}
            placeholder={{
              label: 'Selecione um tipo de ar condicionado',
              value: null,
            }}
            value={data?.type_air_conditioning}
            items={optionsAirConditioning}
          />

          {typeAirConditioning === 'other' && (
            <InputTextForm
              required={!report_id}
              label="Outro tipo de ar condicionado"
              placeholder="Outro tipo de ar condicionado"
              onChangeText={(value) => setValue('type_air_conditioning', value)}
            />
          )}

          <InputComposed label="Sistema selado?">
            <Switch
              colorScheme={'red'}
              onToggle={() => setHermeticallySealed((prev) => !prev)}
              isChecked={hermeticallySealed}
            />
          </InputComposed>

          {/* SECTION FLUID */}

          <LabelForm label="Fluido" />

          <InputSelectForm
            required={!report_id}
            label="Existente na instalação"
            onValueChange={handleChangeTypeExistentFluid}
            placeholder={{
              label: 'Selecione um tipo de fluido existente',
              value: null,
            }}
            value={data?.fluid_existent}
            items={optionsTypeFluidExistent}
          />

          {typeFluidExistent === 'other' && (
            <InputTextForm
              required={!report_id}
              label="Outro tipo de fluido"
              placeholder="Outro tipo de fluido "
              onChangeText={(value) => setValue('fluid_existent', value)}
            />
          )}

          <InputSelectForm
            required={!report_id}
            label="Tipo de intervenção"
            onValueChange={handleChangeTypeIntervention}
            placeholder={{
              label: 'Selecione um tipo intervenção',
              value: null,
            }}
            value={data?.type_intervention}
            items={optionsTypeIntervention}
          />

          {typeIntervention === 'other' && (
            <InputTextForm
              required={!report_id}
              label="Outro tipo de intervenção"
              placeholder="Outro tipo de intervenção "
              onChangeText={(value) => setValue('type_intervention', value)}
            />
          )}

          <InputTextForm
            label="Fluido carregado"
            placeholder="Fluido carregado"
          />

          <InputTextForm
            label="Descrição"
            placeholder="Descrição"
            onChangeText={(value) => setValue('fluid_description', value)}
            multiline
          />

          <InputTextForm
            label="Temperatura quente (°C)"
            placeholder="Temperatura quente"
            onChangeText={(value) => setValue('temp_heat', Number(value))}
          />

          <InputTextForm
            label="Temperatura frio (°C)"
            placeholder="Temperatura frio"
            onChangeText={(value) => setValue('temp_cold', Number(value))}
          />

          {/* SECTION OPINION */}

          <LabelForm label="Opinião" />

          <InputComposed label="Cliente">
            <Radio.Group
              colorScheme={'red'}
              name="opinion"
              defaultValue={data?.satisfied ? 'satisfied' : 'dissatisfied'}
              onChange={(value) =>
                setValue('satisfied', value === 'satisfied' ? true : false)
              }
            >
              <Stack
                direction={{
                  base: 'row',
                }}
              >
                <Radio value="satisfied" my={1}>
                  Satisfeito
                </Radio>
                <Radio ml="4" value="dissatisfied" my={1}>
                  Insatisfeito
                </Radio>
              </Stack>
            </Radio.Group>
          </InputComposed>

          <Button title="Guardar" onPress={handleSubmit(onSubmitForm)} />
        </ScrollView>
      )}
    </VStack>
  );
};
