import React from 'react';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

export default function Dashboard() {
  const [search, setSearch] = useState('');

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

Dashboard.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="dashboard" size={20} color={tintColor} />
  ),
};
