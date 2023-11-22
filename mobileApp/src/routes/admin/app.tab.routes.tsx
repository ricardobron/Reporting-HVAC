import { AntDesign, Feather } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from 'native-base';
import { AppStackRoutes } from './app.stack.routes';
import { ScanQrCode } from 'src/screens/public/ScanQrCode';
import { SignOut } from 'src/screens/SignOut';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabAdminRoutes() {
  const { colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.red[500],
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: colors.gray[500],
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          // height: 78,
          backgroundColor: colors.primary[700],
        },
      }}
    >
      <Screen
        name="HomeAdmin"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} style={{ color: color }} />
          ),
        }}
      />
      <Screen
        name="ScanQrCode"
        component={ScanQrCode}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="qrcode" size={24} style={{ color: color }} />
          ),
        }}
      />
      <Screen
        options={{
          tabBarLabel: 'Sair',
          tabBarIcon: ({ color }) => (
            <Feather name="log-out" size={24} style={{ color: color }} />
          ),
        }}
        name="Logout"
        component={SignOut}
      />
    </Navigator>
  );
}
