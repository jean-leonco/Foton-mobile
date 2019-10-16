import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useQuery } from '@entria/relay-experimental';
import { graphql } from 'react-relay';

import { DetailsQueryResponse } from './__generated__/DetailsQuery.graphql';

import ErrorBoundaryWithRetry from '../../relay/ErrorBoundaryWithRetry';
import ErrorScreen from '../ErrorScreen';
import LoadingScreen from '../LoadingScreen';

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

function Details({ navigation }) {
  const id = navigation.getParam('id');

  const response: DetailsQueryResponse | any = useQuery(
    graphql`
      query DetailsQuery($id: ID!) {
        product(id: $id) {
          name
          description
          price
        }
      }
    `,
    { id },
  );

  const { product } = response;

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

function DetailsWrapper(props) {
  return (
    //@ts-ignore
    <ErrorBoundaryWithRetry
      fallback={error => <ErrorScreen error={error.message} />}
    >
      <React.Suspense fallback={<LoadingScreen />}>
        <Details {...props} />
      </React.Suspense>
    </ErrorBoundaryWithRetry>
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
