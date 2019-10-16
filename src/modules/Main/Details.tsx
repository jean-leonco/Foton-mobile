import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { QueryRenderer, graphql } from 'react-relay';
import styled from 'styled-components/native';

import env from '../../relay/Environment';
import LoadingScreen from '../LoadingScreen';
import ErrorScreen from '../ErrorScreen';

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

function Details({ query }) {
  const { product } = query;

  return (
    <Container>
      <Title>{product.name}</Title>

      <Info>
        <Statement>Description: </Statement>
        <Data>{product.description}</Data>
      </Info>

      <Info>
        <Statement>Price: </Statement>
        <Data>${product.price}</Data>
      </Info>

      <Info>
        <Statement>Created at: </Statement>
        <Data>14/05/2001</Data>
      </Info>
    </Container>
  );
}

const query = graphql`
  query DetailsQuery($id: ID!) {
    product(id: $id) {
      name
      description
      price
    }
  }
`;

function DetailsWrapper({ navigation }) {
  const id = navigation.getParam('id');

  return (
    //@ts-ignore
    <QueryRenderer
      environment={env}
      query={query}
      variables={{ id }}
      render={({ error, props }) => {
        if (error) {
          return <ErrorScreen error={error.message} />;
        } else if (props) {
          return <Details query={props} />;
        }

        return <LoadingScreen />;
      }}
    />
  );
}

export default DetailsWrapper;

DetailsWrapper.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Information',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
      <Icon name="chevron-left" size={30} color="#333" />
    </TouchableOpacity>
  ),
});
