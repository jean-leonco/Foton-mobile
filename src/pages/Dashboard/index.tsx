import React from 'react';
import { useState } from 'react';
import {
  useRelayEnvironment,
  useFragment,
  useQuery,
} from '@entria/relay-experimental';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { graphql, RelayProp } from 'react-relay';

import { Dashboard_products } from './__generated__/Dashboard_products.graphql';

import {
  Container,
  Title,
  Actions,
  Search,
  Clear,
  Input,
  ProductList,
  ProductCard,
  Product,
  CreatedAt,
} from './styles';

type Props = {
  relay: RelayProp;
  products: Dashboard_products;
};

function Dashboard(props: Props) {
  const [search, setSearch] = useState('');

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

      <Actions>
        <Search>
          <Icon name="search" size={22} color="#333" />
          <Input
            placeholder="Search a product"
            autoCorrect={false}
            autoCapitalize="none"
            value={search}
            onChangeText={setSearch}
          />
        </Search>

        <Clear>
          <Icon name="clear" size={22} color="#fff" />
        </Clear>
      </Actions>

      <ProductList
        data={[1, 2, 3]}
        keyExtractor={(item: Number) => String(item)}
        renderItem={({ item }) => (
          <ProductCard>
            <Product>A new product</Product>
            <CreatedAt>Added 2 days ago</CreatedAt>
          </ProductCard>
        )}
      />
    </Container>
  );
}

export default Dashboard;

Dashboard.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="dashboard" size={20} color={tintColor} />
  ),
};
