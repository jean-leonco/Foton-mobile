import React, { useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { setToken } from '../../relay/Environment';

export default function Me({ navigation }) {
  useEffect(() => {
    async function getToken() {
      //await AsyncStorage.removeItem('token');
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setToken(token as string);
        return navigation.navigate('Dashboard');
      }

      return navigation.navigate('SignIn');
    }
    getToken();
  }, []);
  return <View />;
}
