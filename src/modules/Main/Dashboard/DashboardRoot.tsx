import React from 'react';
import { useFragment } from '@entria/relay-experimental';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { graphql, RelayProp } from 'react-relay';
import styled from 'styled-components/native';

import { Dashboard_products } from './__generated__/Dashboard_products.graphql';
import DashboardSearch from './DashboardSearch';
import DashboardList from './DashboardList';

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

//  ### TYPES

type Props = {
  relay: RelayProp;
  products: Dashboard_products;
};

//  ### JSX

function Dashboard(props: Props) {
  const products = useFragment(
    graphql`
      fragment Dashboard_products on Query {
        products(first: 10) @connection(key: "Dashboard_products") {
          edges {
            node {
              id
              name
              description
            }
          }
          pageInfo {
            hasNextPage
            startCursor
          }
        }
      }
    `,
    props.products,
  );

  return (
    <Container>
      <Title>Dashboard</Title>

      <DashboardSearch />

      <DashboardList />
    </Container>
  );
}

export default Dashboard;

Dashboard.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="dashboard" size={20} color={tintColor} />
  ),
};
