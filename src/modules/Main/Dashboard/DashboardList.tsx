import React, { useEffect } from 'react';
import { Animated } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import { graphql } from 'react-relay';
import { useFragment } from '@entria/relay-experimental';

import styled from 'styled-components/native';

import { DashboardList_products } from './__generated__/DashboardList_products.graphql';

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

//  ### TYPES

type Props = {
  products: DashboardList_products;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
};

const mockData = [{ id: 'dasds5d1a' }, { id: 'dasds5d1a' }];

//  ### JSX

export default function DashboardList(props: Props) {
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

  const products = useFragment(
    graphql`
      fragment DashboardList_products on Query {
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

  function handleNavigate(id: string) {
    props.navigation.navigate('Details', { id });
  }

  return (
    <AnimatedList
      style={[{ transform: [...offset.getTranslateTransform()] }, { opacity }]}
      data={[1, 2, 3]}
      keyExtractor={(item: Number) => String(item)}
      renderItem={({ item }) => (
        <ProductCard onPress={() => handleNavigate(item)}>
          <Product>A new product</Product>
          <CreatedAt>Added 2 days ago</CreatedAt>
        </ProductCard>
      )}
    />
  );
}
