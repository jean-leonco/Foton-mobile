import React, { useEffect, useState, useCallback } from 'react';
import { Animated, ActivityIndicator } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

import {
  graphql,
  createPaginationContainer,
  RelayPaginationProp,
} from 'react-relay';

import { formatDistance, parseISO } from 'date-fns';
import styled from 'styled-components/native';

import { DashboardList_query } from './__generated__/DashboardList_query.graphql';

import SearchInput from '../../SearchInput';

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

interface Props {
  query: DashboardList_query;
  relay: RelayPaginationProp;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

//  ### JSX

function DashboardList({ navigation, query, relay }: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const [endLoading, setEndLoading] = useState(false);

  //@ts-ignore
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

  function handleOnEndReached() {
    if (!relay.hasMore() || relay.isLoading() || endLoading) return;
    setEndLoading(true);

    relay.loadMore(5, () => setEndLoading(false));
  }

  function handleOnRefresh() {
    if (relay.isLoading()) return;
    setRefreshing(true);

    relay.refetchConnection(5, () => setRefreshing(false));
  }

  function handleNavigate(id: string) {
    navigation.navigate('Details', { id });
  }

  function handleSearch(search: string) {
    relay.refetchConnection(5, () => {}, { search });
  }

  return (
    <>
      <SearchInput searchFunction={handleSearch} />

      <AnimatedList
        style={[
          { transform: [...offset.getTranslateTransform()] },
          { opacity },
        ]}
        data={edges}
        keyExtractor={item => item.node.id}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          endLoading && <ActivityIndicator color="#999" size={20} />
        }
        onRefresh={handleOnRefresh}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <ProductCard onPress={() => handleNavigate(item.node.id)}>
            <Product>{item.node.name}</Product>
            <CreatedAt>{shapeDate(item.node.createdAt)}</CreatedAt>
          </ProductCard>
        )}
      />
    </>
  );
}

const DashboardListFragment = createPaginationContainer(
  DashboardList,
  {
    query: graphql`
      fragment DashboardList_query on Query {
        products(first: $count, after: $cursor, search: $search)
          @connection(key: "Dashboard_products") {
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
  },
  {
    direction: 'forward',
    query: graphql`
      query DashboardListForwardQuery(
        $count: Int!
        $cursor: String
        $search: String
      ) {
        ...DashboardList_query
      }
    `,
    getConnectionFromProps: props => props.query && props.query.products,
    getVariables: (props, { count, cursor }, variables) => ({ count, cursor }),
  },
);

export default DashboardListFragment;
