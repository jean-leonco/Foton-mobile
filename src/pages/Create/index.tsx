import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import { Container } from './styles';

export default function Create() {
  return <Text>Create</Text>;
}

Create.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="library-add" size={20} color={tintColor} />
  ),
};
