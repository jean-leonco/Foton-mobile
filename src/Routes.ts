import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from './modules/Auth/SignIn';
import SignUp from './modules/Auth/SignUp';

import Dashboard from './modules/Main/Dashboard/DashboardRoot';
import Create from './modules/Main/Create';

import Details from './modules/Main/Details';

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
        Details: createStackNavigator(
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
        ),
      },
      {
        resetOnBlur: true,
        initialRouteName: isAuth ? 'App' : 'Sign',
      },
    ),
  );
