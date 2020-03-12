import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import gql from 'graphql-tag';
import Firebase from '../clients/Firebase';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from './Auth';
import Header from './Header';
import Input from './Input';
import useForm from './useForm';

const NEW_SCOUT_MUTATION = gql`
  mutation updateScout($scout: ScoutInput!) {
    updateScout(scout: $scout) {
      id
    }
  }
`;

const SignUp = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const [createScout] = useMutation(NEW_SCOUT_MUTATION);
  const handleSignup = useCallback(
    async formData => {
      const { email, password, firstname, lastname } = formData;
      try {
        await Firebase.auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async ({ user }) => {
            await createScout({
              variables: {
                scout: {
                  id: user.uid,
                  firstname: firstname,
                  lastname: lastname
                }
              }
            });
          });
        history.push('/dashboard');
      } catch (error) {
        alert(error);
      }
    },
    [history, createScout]
  );
  const { inputs, handleInputChange, handleSubmit } = useForm(handleSignup);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="flex flex-col items-center bg-black w-full h-full">
      <Header showLogin={true} />
      <div className="flex-1 w-full content-center overflow-y-auto">
        <form
          className="flex flex-col pt-10 px-4 m-auto max-w-lg"
          onSubmit={handleSubmit}
        >
          <Input
            label="Email"
            name="email"
            type="email"
            required={true}
            onChange={handleInputChange}
            value={inputs.email}
            placeholder="example@example.com"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            required={true}
            onChange={handleInputChange}
            value={inputs.password}
            placeholder="password"
          />
          <br />
          <Input
            label="First Name"
            name="firstname"
            type="text"
            required={true}
            onChange={handleInputChange}
            value={inputs.firstname}
            placeholder="first name"
          />
          <Input
            label="Last Name"
            name="lastname"
            type="last name"
            required={true}
            onChange={handleInputChange}
            value={inputs.lastname}
            placeholder="last name"
          />
          <br />
          <button
            className="inline-block text-md font-logo px-4 py-3 leading-none border-2
          rounded-md text-black bg-secondary border-transparent hover:text-secondary
          hover:bg-black hover:border-secondary mt-4"
            type="submit"
          >
            sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
