import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { airConditioningTypesAxios } from 'src/services/airConditioningTypes';
import { existentFluidTypesAxios } from 'src/services/existentFluidTypes';
import { installationTypesAxios } from 'src/services/installationTypes';

import { IFindMinifiedResponse as IInstallationTypes } from 'src/services/installationTypes/installationTypesDTO';
import { interventionTypesAxios } from 'src/services/interventionTypes';

export const useGetOptionsReports = () => {
  const [loading, setLoading] = useState(true);

  const airConditioningTypesApi = airConditioningTypesAxios();
  const existentFluidTypesApi = existentFluidTypesAxios();
  const installationTypesApi = installationTypesAxios();
  const interventionTypesApi = interventionTypesAxios();

  const [optionsInstalation, setOptionsInstallation] = useState<
    IInstallationTypes[]
  >([]);
  const [optionsAirConditioning, setOptionsAirConditioning] = useState<
    IInstallationTypes[]
  >([]);
  const [optionsTypeFluidExistent, setOptionsTypeFluidExistent] = useState<
    IInstallationTypes[]
  >([]);
  const [optionsTypeIntervention, setOptionsTypeIntervention] = useState<
    IInstallationTypes[]
  >([]);

  async function loadInstallationTypes() {
    const response = await installationTypesApi.find();

    setOptionsInstallation(response);
  }

  async function loadAirConditioningTypes() {
    const response = await airConditioningTypesApi.find();

    setOptionsAirConditioning(response);
  }

  async function loadExistentFluidTypes() {
    const response = await existentFluidTypesApi.find();

    setOptionsTypeFluidExistent(response);
  }

  async function loadInterventionTypes() {
    const response = await interventionTypesApi.find();

    setOptionsTypeIntervention(response);
  }

  useFocusEffect(
    React.useCallback(() => {
      async function loadData() {
        try {
          setLoading(true);

          await loadInstallationTypes();
          await loadAirConditioningTypes();
          await loadExistentFluidTypes();
          await loadInterventionTypes();

          setLoading(false);
        } catch {
          setLoading(false);
          Alert.alert('Ocorreu um erro ao obter as opções');
        }
      }

      loadData();
    }, [])
  );

  return {
    optionsInstalation,
    optionsAirConditioning,
    optionsTypeFluidExistent,
    optionsTypeIntervention,
    loading,
  };
};
