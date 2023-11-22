import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { CompanyHome } from 'src/screens/public/CompanyHome';
import { MachineHome } from 'src/screens/public/MachineHome';

import { ReportsHome } from 'src/screens/public/ReportsHome';
import { useAuth } from 'src/hooks/auth';

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
  const { company } = useAuth();

  if (!company?.id) return null;

  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="CompanyHome"
    >
      <Screen
        name="CompanyHome"
        component={CompanyHome}
        initialParams={{ company_id: company.id }}
      />

      <Screen name="MachineHome" component={MachineHome} />

      <Screen name="ReportsHome" component={ReportsHome} />
    </Navigator>
  );
}
