import React, { useEffect, useState, useCallback } from 'react';
import { Animated } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { graphql, createFragmentContainer } from 'react-relay';

import { formatDistance, parseISO } from 'date-fns';
import styled from 'styled-components/native';

//  ### STYLES

// @ts-ignore
const ProductList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
`;

const ProductCard = styled(RectButton)`
  margin-bottom: 20px;
  padding: 10px;
`;

const Product = styled.Text`
  color: #333;
  font-size: 18px;
  font-weight: bold;
`;

const CreatedAt = styled.Text`
  color: #999;
  font-size: 14px;
  margin-top: 10px;
`;

const opacity = new Animated.Value(0);
const offset = new Animated.ValueXY({ x: 250, y: 0 });

const AnimatedList = Animated.createAnimatedComponent(ProductList);

//  ### JSX

function DashboardList({ navigation, query, relay }) {
  const [refreshing, setRefreshing] = useState(false);

  const { edges } = query.products;

  const shapeDate = useCallback(
    date => formatDistance(parseISO(date), new Date()),
    [edges],
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(offset.x, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),

      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function handleOnEndReached() {}

  function handleOnRefresh() {}

  function handleNavigate(id: string) {
    navigation.navigate('Details', { id });
  }

  return (
    <AnimatedList
      style={[{ transform: [...offset.getTranslateTransform()] }, { opacity }]}
      data={edges}
      keyExtractor={item => item.node.id}
      onEndReached={handleOnEndReached}
      onRefresh={handleOnRefresh}
      refreshing={refreshing}
      renderItem={({ item }) => (
        <ProductCard onPress={() => handleNavigate(item.node.id)}>
          <Product>{item.node.name}</Product>
          <CreatedAt>{shapeDate(item.node.createdAt)}</CreatedAt>
        </ProductCard>
      )}
    />
  );
}

const DashboardListFragment = createFragmentContainer(DashboardList, {
  query: graphql`
    fragment DashboardList_query on Query {
      products(first: 10) @connection(key: "Dashboard_products") {
        edges {
          node {
            id
            name
            description
            createdAt
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `,
});

export default DashboardListFragment;
