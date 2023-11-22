import { createStackNavigator } from '@react-navigation/stack';

import { ChooseLogin } from '../screens/ChooseLogin';
import { SignInAdmin } from '../screens/SignInAdmin';
import { SignInCompany } from '../screens/SignInCompany';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      initialRouteName="ChooseLogin"
      screenOptions={{ headerShown: false }}
    >
      <Screen name="ChooseLogin" component={ChooseLogin} />

      <Screen name="SignInAdmin" component={SignInAdmin} />
      <Screen name="SignInCompany" component={SignInCompany} />
    </Navigator>
  );
}
