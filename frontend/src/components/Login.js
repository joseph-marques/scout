import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Firebase from '../clients/Firebase';
import { AuthContext } from './Auth';
import Header from './Header';
import Input from './Input';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await Firebase.auth().signInWithEmailAndPassword(
          email.value,
          password.value
        );
        history.push('/dashboard');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    // TODO: return to /dashboard
    return <Redirect to="/settings" />;
  }

  return (
    <div className="flex flex-col items-center content-center bg-black w-full h-full">
      <Header />
      <div className="flex-1 w-full content-center overflow-y-auto">
        <form
          className="flex flex-col pt-10 px-4 m-auto max-w-lg"
          onSubmit={handleLogin}
        >
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="example@example.com"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="password"
          />
          <button
            className="inline-block text-md font-logo px-4 py-3 leading-none border-2
          rounded-md text-black bg-secondary border-transparent hover:text-secondary
          hover:bg-black hover:border-secondary mt-4"
            type="submit"
          >
            log in
          </button>
          <Link
            to="/signup"
            className="inline-block text-md mt-16 font-logo px-4 py-3 leading-none border-2
          rounded-md text-gray-200 text-center border-gray-200 hover:text-darkgray
          hover:bg-gray-200 mt-4"
          >
            sign up
          </Link>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
