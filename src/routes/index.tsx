import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from '../modules/Auth/SignIn';
import SignUp from '../modules/Auth/SignUp';

import Dashboard from '../modules/Main/Dashboard/DashboardRoot';
import Create from '../modules/Main/Create';

import Details from '../modules/Main/Details';
import Me from '../modules/Main/Me';

const Main = createBottomTabNavigator(
  {
    Dashboard,
    Create,
  },
  {
    resetOnBlur: true,
    tabBarOptions: {
      keyboardHidesTabBar: true,
      activeTintColor: '#4b3bff',
      inactiveTintColor: '#333',
      style: {
        backgroundColor: '#fff',
        borderTopWidth: 0,
      },
    },
  },
);

const Hidden = createStackNavigator(
  {
    Details,
  },
  {
    defaultNavigationOptions: {
      headerTransparent: true,
      headerTitleStyle: {
        color: '#333',
        fontSize: 25,
        fontWeight: 'bold',
      },
      headerLeftContainerStyle: {
        marginLeft: 10,
      },
    },
  },
);

const Auth = createSwitchNavigator({
  SignIn,
  SignUp,
});

const App = createAppContainer(
  createSwitchNavigator(
    {
      Me: { screen: Me },
      Auth,
      Main,
      Hidden,
    },
    {
      initialRouteName: 'Me',
    },
  ),
);

export default App;
