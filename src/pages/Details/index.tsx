import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Title, Info, Statement, Data } from './styles';

export default function Details() {
  return (
    <Container>
      <Title>Product name</Title>

      <Info>
        <Statement>Description: </Statement>
        <Data>A new Product</Data>
      </Info>

      <Info>
        <Statement>Price: </Statement>
        <Data>$10.0</Data>
      </Info>

      <Info>
        <Statement>Created at: </Statement>
        <Data>14/05/2001</Data>
      </Info>
    </Container>
  );
}

Details.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Information',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
      <Icon name="chevron-left" size={30} color="#333" />
    </TouchableOpacity>
  ),
});
