import React from 'react';
import createRouter from './Routes';
import { useQuery } from '@entria/relay-experimental';
import { graphql } from 'react-relay';
import ErrorBoundaryWithRetry from './relay/ErrorBoundaryWithRetry';
import { Text } from 'react-native';

export default function App() {
  const isAuth = true;

  const Routes = createRouter(isAuth);

  if (isAuth) {
    const Root = () => {
      const query = useQuery(graphql`
        query AppQuery {
          ...Dashboard_products
        }
      `);

      return <Routes />;
    };

    const RootWrapper = () => {
      return (
        //@ts-ignore
        <ErrorBoundaryWithRetry
          fallback={error => <Text>{error.message}</Text>}
        >
          <React.Suspense fallback={<Text>loading</Text>}>
            <Root />
          </React.Suspense>
        </ErrorBoundaryWithRetry>
      );
    };

    return <RootWrapper />;
  }

  return <Routes />;
}
