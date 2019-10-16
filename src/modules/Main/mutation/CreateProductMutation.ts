import { graphql, commitMutation } from 'react-relay';

import environment from '../../../relay/Environment';

import {
  CreateProductInput,
  CreateProductMutationResponse,
  CreateProductMutation,
} from './__generated__/CreateProductMutation.graphql';

const mutation = graphql`
  mutation CreateProductMutation($input: CreateProductInput!) {
    CreateProductMutation(input: $input) {
      product {
        _id
        id
        name
        description
      }
      error
    }
  }
`;

function commit(
  input: CreateProductInput,
  onCompleted: (response: CreateProductMutationResponse) => void,
  onError: (error: Error) => void,
) {
  return commitMutation<CreateProductMutation>(environment, {
    mutation,
    variables: { input },
    onCompleted,
    onError,
  });
}

export default { commit };
