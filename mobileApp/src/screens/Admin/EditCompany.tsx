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
  ICreateRequest,
  IFindResponse,
  IUpdateRequest,
} from 'src/services/company/companyDTO';
import { companyAxios } from 'src/services/company';
import { useToast } from 'src/hooks/toast';
import { Alert } from 'react-native';

type RouteParams = {
  company_id: string | null;
  data: IFindResponse | null;
};

export const EditCompany = () => {
  const { addToast } = useToast();
  const route = useRoute();

  const routeParams = route.params as RouteParams;
  const { company_id, data } = routeParams;

  const companyApi = companyAxios();

  const navigation = useNavigation();

  const { register, setValue, handleSubmit, getValues } = useForm<
    ICreateRequest | IUpdateRequest
  >({
    defaultValues: {
      country: data?.country || '',
      name: data?.name || '',
      nif: data?.nif || '',
      postal_code: data?.postal_code || '',
      telephone: data?.telephone || '',
      street: data?.street || '',
    },
  });

  useEffect(() => {
    register('name');
    register('nif');
    register('street');
    register('country');
    register('postal_code');
    register('telephone');
  }, [register]);

  function handleNavigateToBack() {
    navigation.goBack();
  }

  async function handleDeleteCompany() {
    if (!company_id) return;

    try {
      await companyApi.deleteOne(company_id);
      navigation.navigate('Home');
    } catch {
      return addToast({
        title: 'Ocorreu um erro',
        description: 'Erro ao eliminar empresa',
        status: 'error',
      });
    }
  }

  const showConfirmDialogDeleteCompany = () => {
    return Alert.alert(
      'Eliminar empresa?',
      `Tem a certeza que deseja eliminar esta empresa?`,
      [
        {
          text: 'Sim',
          onPress: () => {
            handleDeleteCompany();
          },
        },
        {
          text: 'Não',
        },
      ]
    );
  };

  async function onSubmitForm(data: ICreateRequest | IUpdateRequest) {
    try {
      if (!company_id) {
        const dataToSend = data as ICreateRequest;

        const response = await companyApi.create(dataToSend);

        navigation.navigate('CompanyHome', { company_id: response.id });
      } else {
        const dataToSend = data as IUpdateRequest;

        const response = await companyApi.update(company_id, dataToSend);

        navigation.navigate('CompanyHome', { company_id: response.id });
      }
    } catch {
      addToast({
        title: `Erro ao ${company_id ? 'editar' : 'criar'} empresa`,
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
        justifyContent={
          routeParams?.company_id ? 'space-between' : 'flex-start'
        }
        alignItems={'center'}
      >
        <BackButton onPress={handleNavigateToBack} />

        <Text ml="2">
          {routeParams?.company_id ? 'Edição da empresa' : 'Criação da empresa'}
        </Text>

        {routeParams?.company_id && (
          <RectButton onPress={showConfirmDialogDeleteCompany}>
            <Feather name="trash" size={24} />
          </RectButton>
        )}
      </HStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <InputTextForm
          required={!company_id}
          label={'Nome'}
          placeholder="Nome"
          defaultValue={getValues('name')}
          onChangeText={(text) => setValue('name', text)}
        />
        <InputTextForm
          required={!company_id}
          label={'Contribuinte'}
          placeholder="Contribuinte"
          defaultValue={getValues('nif')}
          onChangeText={(text) => setValue('nif', text)}
        />

        <InputTextForm
          required={!company_id}
          label={'Morada'}
          placeholder="Morada"
          defaultValue={getValues('street')}
          onChangeText={(text) => setValue('street', text)}
        />
        <InputTextForm
          required={!company_id}
          label={'País'}
          placeholder="País"
          defaultValue={getValues('country')}
          onChangeText={(text) => setValue('country', text)}
        />
        <InputTextForm
          required={!company_id}
          label={'Código Postal'}
          placeholder="Código Postal"
          defaultValue={getValues('postal_code')}
          onChangeText={(text) => setValue('postal_code', text)}
        />
        <InputTextForm
          required={!company_id}
          label={'Telemóvel'}
          placeholder="Telemóvel"
          defaultValue={getValues('telephone')}
          onChangeText={(text) => setValue('telephone', text)}
        />

        <Button title="Guardar" onPress={handleSubmit(onSubmitForm)} />
      </ScrollView>
    </VStack>
  );
};
