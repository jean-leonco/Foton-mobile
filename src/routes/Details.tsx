import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Details from '../modules/Details/Details';

const Stack = createStackNavigator();

const HeaderLeft: React.FC = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={30} color="#333" />
    </TouchableOpacity>
  );
};

const DetailsRoute: React.FC = () => {
  const options: StackNavigationOptions = {
    headerTitleStyle: {
      color: '#333',
      fontSize: 25,
      fontWeight: 'bold',
    },
    headerLeftContainerStyle: {
      marginLeft: 10,
    },
  };

  const DetailsOptions: StackNavigationOptions = {
    headerTitle: 'Information',
    headerLeft: () => <HeaderLeft />,
  };

  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen
        name="Details"
        component={Details}
        options={DetailsOptions}
      />
    </Stack.Navigator>
  );
};

export default DetailsRoute;
