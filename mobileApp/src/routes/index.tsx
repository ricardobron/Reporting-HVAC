import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { AppTabAdminRoutes } from './admin/app.tab.routes';
import { AppTabCompanyRoutes } from './company/app.tab.routes';
import { useAuth } from 'src/hooks/auth';
import { Loading } from 'src/components/Loading';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from 'src/services/api';

import * as SplashScreen from 'expo-splash-screen';
import { View } from 'native-base';
import { useToast } from 'src/hooks/toast';

export function Routes() {
  const { addToast } = useToast();
  const { user, loading, company, signOut } = useAuth();
  const isAuthenticated = !!user || !!company;

  const userType: 'admin' | 'company' | null = !!user ? 'admin' : 'company';

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const token = await AsyncStorage.getItem('@SSAC:token');

        if (!token) {
          signOut();

          return;
        }

        await api.post('/sessions/validateToken', { token });
      } catch (e) {
        signOut();

        addToast({
          title: 'Sessão expirada',
          description: 'Tem de iniciar sessão novamente',
          status: 'error',
        });
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (loading) {
    return <Loading />;
  }

  if (!appIsReady) {
    return null;
  }

  return (
    <View flex="1" onLayout={onLayoutRootView}>
      <NavigationContainer>
        {isAuthenticated ? (
          userType === 'admin' ? (
            <AppTabAdminRoutes />
          ) : (
            <AppTabCompanyRoutes />
          )
        ) : (
          <AuthRoutes />
        )}
      </NavigationContainer>
    </View>
  );
}
