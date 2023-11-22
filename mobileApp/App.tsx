import { StatusBar } from 'expo-status-bar';

import { NativeBaseProvider } from 'native-base';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { THEME } from './src/styles/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';
import AppProvider from 'src/hooks';

import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar backgroundColor="transparent" translucent />
      <AppProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {fontsLoaded ? <Routes /> : <Loading />}
        </GestureHandlerRootView>
      </AppProvider>
    </NativeBaseProvider>
  );
}
