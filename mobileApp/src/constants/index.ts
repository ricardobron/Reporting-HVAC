import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';

const runtimeEnvironments = {
  API_URL: 'http://192.168.1.9:3334',
};

export const pdfDir = FileSystem.documentDirectory + 'appAC/';

export const API_URL =
  Constants?.expoConfig?.extra?.API_URL || runtimeEnvironments.API_URL;
