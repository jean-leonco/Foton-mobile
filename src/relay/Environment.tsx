import {
  Environment,
  Network,
  RecordSource,
  Store,
  Variables,
} from 'relay-runtime';

let token: string;

export function setToken(storageToken: string) {
  token = storageToken;
}

async function fetchQuery(operation: any, variables: Variables): Promise<{}> {
  //@ts-ignore
  const response = await fetch('http://localhost:5000/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: token,
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
