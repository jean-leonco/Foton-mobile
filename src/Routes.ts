import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Create from './pages/Create';

export default (isAuth = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
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
                height: 60,
                backgroundColor: '#fff',
                borderTopWidth: 0,
              },
            },
          },
        ),
      },
      {
        resetOnBlur: true,
        initialRouteName: isAuth ? 'App' : 'Sign',
      },
    ),
  );
