import { graphql, commitMutation } from 'react-relay';

import {
  UserRegisterWithEmailInput,
  UserRegisterWithEmailMutationResponse,
  UserRegisterWithEmailMutation,
} from './__generated__/UserRegisterWithEmailMutation.graphql';

import environment from '../../../relay/Environment';

const mutation = graphql`
  mutation UserRegisterWithEmailMutation($input: UserRegisterWithEmailInput!) {
    UserRegisterWithEmail(input: $input) {
      token
      error
    }
  }
`;

function commit(
  input: UserRegisterWithEmailInput,
  onCompleted: (response: UserRegisterWithEmailMutationResponse) => void,
  onError: (error: Error) => void,
) {
  return commitMutation<UserRegisterWithEmailMutation>(environment, {
    mutation,
    variables: { input },
    onCompleted,
    onError,
  });
}

export default { commit };
