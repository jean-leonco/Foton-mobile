import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

import { graphql } from 'react-relay';
import { useQuery } from '@entria/relay-experimental';

import DashboardSearch from './DashboardSearch';
import DashboardList from './DashboardList';

import ErrorBoundaryWithRetry from '../../../relay/ErrorBoundaryWithRetry';
import ErrorScreen from '../../ErrorScreen';
import LoadingScreen from '../../LoadingScreen';

//  ### STYLES

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
  background: #fff;
`;

const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: #333;
`;

//  ### JSX

function DashboardRoot(props) {
  const data = useQuery(
    graphql`
      query DashboardRootQuery {
        ...DashboardList_products
      }
    `,
    {},
  );

  return (
    <Container>
      <Title>Dashboard</Title>

      <DashboardSearch />

      <DashboardList products={data.products} {...props} />
    </Container>
  );
}

function DashboardWrapper(props) {
  return (
    //@ts-ignore
    <ErrorBoundaryWithRetry
      fallback={error => <ErrorScreen error={error.message} />}
    >
      <React.Suspense fallback={<LoadingScreen />}>
        <DashboardRoot {...props} />
      </React.Suspense>
    </ErrorBoundaryWithRetry>
  );
}

export default DashboardWrapper;

DashboardWrapper.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="dashboard" size={20} color={tintColor} />
  ),
};
