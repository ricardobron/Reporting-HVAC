import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { HStack, ScrollView, Text, VStack } from 'native-base';

import { useForm } from 'react-hook-form';

import { Feather } from '@expo/vector-icons';

import { BackButton } from 'src/components/BackButton';
import { InputTextForm } from 'src/components/form/InputTextForm';
import { useEffect } from 'react';
import { Button } from 'src/components/Button';
import { RectButton } from 'react-native-gesture-handler';
import {
  IFindResponse,
  ICreateRequest,
  IUpdateRequest,
} from 'src/services/machine/machineDTO';
import { machineAxios } from 'src/services/machine';
import { Alert } from 'react-native';
import { useToast } from 'src/hooks/toast';

type RouteParams = {
  company_id: string;
  machine_id?: string;
  data?: IFindResponse;
};

export const EditMachine = () => {
  const route = useRoute();

  const { addToast } = useToast();

  const routeParams = route.params as RouteParams;

  const { data, machine_id, company_id } = routeParams;

  const machineApi = machineAxios();

  const navigation = useNavigation();

  const { register, setValue, handleSubmit, getValues } = useForm<
    ICreateRequest | IUpdateRequest
  >({
    defaultValues: {
      year: data?.year || new Date().getFullYear(),
      watts_electric: data?.watts_electric || 0,
      brand: data?.brand || '',
      serie: data?.serie || '',
      model: data?.model || '',
    },
  });

  useEffect(() => {
    register('brand');
    register('model');
    register('serie');
    register('year');
    register('watts_electric');
  }, [register]);

  function handleNavigateToBack() {
    navigation.goBack();
  }

  async function onSubmitForm(data: IUpdateRequest | ICreateRequest) {
    try {
      if (!machine_id) {
        const dataToSend = { ...data, company_id } as ICreateRequest;

        const response = await machineApi.create(dataToSend);

        navigation.navigate('MachineHome', {
          machine_id: response.id,
          company_id,
        });
      } else {
        const dataToSend = data as IUpdateRequest;

        const response = await machineApi.update(machine_id, dataToSend);

        navigation.navigate('MachineHome', {
          machine_id: response.id,
          company_id,
        });
      }
    } catch {
      addToast({
        title: `Erro ao ${machine_id ? 'editar' : 'criar'} máquina`,
        description: 'Tente novamente mais tarde',
        status: 'error',
      });
    }
  }

  async function handleDeleteMachine() {
    if (!machine_id) return;

    try {
      await machineApi.deleteOne(machine_id);

      navigation.goBack();
    } catch {
      return addToast({
        title: 'Ocorreu um erro',
        description: 'Erro ao eliminar máquina',
        status: 'error',
      });
    }
  }

  const showConfirmDialogDeleteMachine = () => {
    return Alert.alert(
      'Eliminar máquina?',
      `Tem a certeza que deseja eliminar esta máquina?`,
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

  return (
    <VStack flex={1} bg={'primary.700'} p={5}>
      <StatusBar style="light" />

      {/* HEADER */}
      <HStack
        w="full"
        mt="6"
        py="3"
        justifyContent={
          routeParams?.machine_id ? 'space-between' : 'flex-start'
        }
        alignItems={'center'}
      >
        <BackButton onPress={handleNavigateToBack} />

        <Text ml="2">
          {routeParams?.machine_id ? 'Edição da máquina' : 'Criação da máquina'}
        </Text>

        {routeParams?.machine_id && (
          <RectButton onPress={showConfirmDialogDeleteMachine}>
            <Feather name="trash" size={24} />
          </RectButton>
        )}
      </HStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <InputTextForm
          required={!machine_id}
          label={'Marca'}
          placeholder="Marca"
          defaultValue={getValues('brand')}
          onChangeText={(text) => setValue('brand', text)}
        />
        <InputTextForm
          required={!machine_id}
          label={'Modelo'}
          placeholder="Modelo"
          defaultValue={getValues('model')}
          onChangeText={(text) => setValue('model', text)}
        />
        <InputTextForm
          required={!machine_id}
          label={'Serie'}
          placeholder="Serie"
          defaultValue={getValues('serie')}
          onChangeText={(text) => setValue('serie', text)}
        />

        <InputTextForm
          required={!machine_id}
          label={'Ano'}
          placeholder="Ano"
          keyboardType="numeric"
          defaultValue={String(getValues('year'))}
          onChangeText={(text) => setValue('year', Number(text))}
        />

        <InputTextForm
          label={'Potência Elec. (A)'}
          placeholder="Potência Elec. (A)"
          keyboardType="numeric"
          defaultValue={String(getValues('watts_electric'))}
          onChangeText={(text) => setValue('watts_electric', Number(text))}
        />

        <Button title="Guardar" onPress={handleSubmit(onSubmitForm)} />
      </ScrollView>
    </VStack>
  );
};
