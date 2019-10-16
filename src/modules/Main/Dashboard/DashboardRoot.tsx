import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

import { graphql, QueryRenderer } from 'react-relay';

import DashboardList from './DashboardList';
import env from '../../../relay/Environment';
import ErrorScreen from '../../ErrorScreen';
import LoadingScreen from '../../LoadingScreen';
import SearchInput from '../../SearchInput';

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
  return (
    <Container>
      <Title>Dashboard</Title>

      <DashboardList {...props} />
    </Container>
  );
}

const query = graphql`
  query DashboardRootQuery($count: Int!, $cursor: String, $search: String) {
    ...DashboardList_query
  }
`;

function DashboardRootWrapper({ navigation }) {
  return (
    //@ts-ignore
    <QueryRenderer
      environment={env}
      variables={{ count: 5 }}
      query={query}
      render={({ error, props }) => {
        if (error) {
          return <ErrorScreen error={error.message} />;
        } else if (props) {
          return <DashboardRoot query={props} navigation={navigation} />;
        }

        return <LoadingScreen />;
      }}
    />
  );
}

DashboardRootWrapper.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="dashboard" size={20} color={tintColor} />
  ),
};

export default DashboardRootWrapper;
