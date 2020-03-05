import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from './Auth';
import Firebase from '../clients/Firebase';
import SignUp from './SignUp';

const NEW_SCOUT_MUTATION = gql`
  mutation updateScout($scout: ScoutInput!) {
    updateScout(scout: $scout) {
      id
    }
  }
`;

function SignUpContainer({ history }) {
  const [createScout, { data }] = useMutation(NEW_SCOUT_MUTATION);

  const handleSignup = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await Firebase.auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then(async ({ user }) => {
            await createScout({ variables: { scout: { id: user.uid } } });
          });
        history.push('/dashboard');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return <SignUp onSignUp={handleSignup} />;
}

export default withRouter(SignUpContainer);
