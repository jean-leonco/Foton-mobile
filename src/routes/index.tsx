import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import App from './App';
import SignIn from '../modules/Auth/SignIn';
import SignUp from '../modules/Auth/SignUp';
import { setToken } from '../relay/Environment';
import Details from './Details';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isSigned, setIsSigned] = useState(false);

  useEffect(() => {
    async function getToken() {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');

      if (token) {
        setToken(token as string);
        setIsSigned(true);
      } else {
        setIsSigned(false);
      }

      setLoading(false);
    }
    getToken();
  }, []);

  if (loading) {
    return <View />;
  }

  return (
    <NavigationContainer>
      {!isSigned ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{ headerShown: false, animationEnabled: false }}
        >
          <Stack.Screen name="App" component={App} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routes;
