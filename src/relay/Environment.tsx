import {
  Environment,
  Network,
  RecordSource,
  Store,
  Variables,
} from 'relay-runtime';
//import cacheHandler from './cacheHandler';

async function fetchQuery(operation: any, variables: Variables): Promise<{}> {
  const response = await fetch('http://localhost:5000/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return response.json();
}

const modernEnvironment: Environment = new Environment({
  //@ts-ignore
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default modernEnvironment;
