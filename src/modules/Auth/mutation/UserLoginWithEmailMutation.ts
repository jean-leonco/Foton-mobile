import { graphql, commitMutation } from 'react-relay';

import {
  UserLoginWithEmailInput,
  UserLoginWithEmailMutationResponse,
  UserLoginWithEmailMutation,
} from './__generated__/UserLoginWithEmailMutation.graphql';

import environment from '../../../relay/Environment';

const mutation = graphql`
  mutation UserLoginWithEmailMutation($input: UserLoginWithEmailInput!) {
    UserLoginWithEmail(input: $input) {
      token
      error
    }
  }
`;

async function commit(
  input: UserLoginWithEmailInput,
  onCompleted: (response: UserLoginWithEmailMutationResponse) => void,
  onError: (error: Error) => void,
) {
  return commitMutation<UserLoginWithEmailMutation>(environment, {
    mutation,
    variables: { input },
    onCompleted,
    onError,
  });
}

export default { commit };
