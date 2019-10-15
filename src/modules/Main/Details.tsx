import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//  ### STYLES

const Container = styled.View`
  flex: 1;
  padding: 20px;
  margin-top: 50px;
`;

const Title = styled.Text`
  color: #333;
  font-size: 25px;
  font-weight: bold;
`;

const Info = styled.View`
  margin-top: 10px;

  flex-direction: row;
  align-items: center;
`;

const Statement = styled.Text`
  color: #666;
  font-size: 18px;
`;

const Data = styled.Text`
  color: #333;
  font-size: 16px;
  font-weight: bold;
`;

//  ### JSX

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
