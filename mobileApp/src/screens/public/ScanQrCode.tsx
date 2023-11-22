import React, { useCallback, useEffect, useState } from 'react';

import {
  BarCodeScanner,
  BarCodeScannerResult,
  PermissionStatus,
} from 'expo-barcode-scanner';

import { useNavigation } from '@react-navigation/native';

import { Alert, StyleSheet } from 'react-native';
import { Text, useTheme, VStack } from 'native-base';

import { Button } from '@components/Button';
import { Loading } from '@components/Loading';

import { isJsonString } from 'src/utils/isJsonString';
import { machineAxios } from 'src/services/machine';

export interface IQrCodeRequest {
  id: string;
  label_type: 'machine';
}

export const ScanQrCode = () => {
  const machineApi = machineAxios();

  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = useCallback(
    async ({ data }: BarCodeScannerResult) => {
      setScanned(true);

      if (!isJsonString(data)) {
        return Alert.alert('QrCode inválido', 'Formato não suportado');
      }

      try {
        const { id, label_type } = JSON.parse(data) as IQrCodeRequest;

        if (label_type === 'machine') {
          const response = await machineApi.findById(id);

          if (!response) {
            return Alert.alert('Máquina não encontrada');
          }

          navigation.navigate('MachineHome', {
            company_id: response.company_id,
            machine_id: response.id,
          });
        }
      } catch (error: any) {
        return Alert.alert('QR Code inválido', 'Inválido');
      }
    },
    []
  );

  return (
    <VStack w="full" h={'full'} mt={6}>
      {hasPermission === null && <Loading />}

      {hasPermission === false && <Text>No access to camera</Text>}

      {!scanned && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject]}
        />
      )}

      {scanned && (
        <Button
          title={'Clique aqui para scanear novamente'}
          onPress={() => setScanned(false)}
        />
      )}
    </VStack>
  );
};
