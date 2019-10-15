import React from 'react';
import createRouter from './Routes';
import { useQuery } from '@entria/relay-experimental';
import { graphql } from 'react-relay';
import ErrorBoundaryWithRetry from './relay/ErrorBoundaryWithRetry';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';

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
          fallback={error => <ErrorScreen error={error.message} />}
        >
          <React.Suspense fallback={<LoadingScreen />}>
            <Root />
          </React.Suspense>
        </ErrorBoundaryWithRetry>
      );
    };

    return <RootWrapper />;
  }

  return <Routes />;
}
