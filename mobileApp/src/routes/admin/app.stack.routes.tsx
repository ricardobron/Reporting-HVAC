import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeAdmin } from 'src/screens/Admin/Home';
import { CompanyHome } from 'src/screens/public/CompanyHome';
import { MachineHome } from 'src/screens/public/MachineHome';
import { EditCompany } from 'src/screens/Admin/EditCompany';
import { EditMachine } from 'src/screens/Admin/EditMachine';
import { ReportsHome } from 'src/screens/public/ReportsHome';
import { EditReport } from 'src/screens/Admin/EditReport';

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen name="Home" component={HomeAdmin} />

      <Screen name="CompanyHome" component={CompanyHome} />
      <Screen name="EditCompany" component={EditCompany} />

      <Screen name="MachineHome" component={MachineHome} />
      <Screen name="EditMachine" component={EditMachine} />

      <Screen name="ReportsHome" component={ReportsHome} />
      <Screen name="EditReport" component={EditReport} />
    </Navigator>
  );
}
