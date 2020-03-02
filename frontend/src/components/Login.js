import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Firebase from './Firebase';
import { AuthContext } from './Auth';
import Header from './Header';

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
        history.push('/home');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/scouts" />;
  }

  return (
    <div className="flex flex-col items-center bg-black w-full h-full">
      <Header />
      <form className="flex flex-col pt-10" onSubmit={handleLogin}>
        <label className="flex flex-col my-3">
          <p className="px-2 text-sm text-sm text-gray-200">Email</p>
          <input
            className="rounded-md p-2 border-transparent focus:border-secondary border-2"
            name="email"
            type="email"
            placeholder="example@example.com"
          />
        </label>
        <label className="flex flex-col my-3">
          <p className="px-2 text-sm text-sm text-gray-200">Password</p>
          <input
            className="rounded-md p-2 border-transparent focus:border-secondary border-2"
            name="password"
            type="password"
            placeholder="password"
          />
        </label>
        <button
          className="inline-block text-md font-logo px-4 py-3 leading-none border-2
          rounded-md text-secondary border-secondary hover:text-darkgray
          hover:bg-secondary mt-4"
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
  );
};

export default withRouter(Login);
