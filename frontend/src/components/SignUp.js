import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import Firebase from './Firebase';
import Header from './Header';

const SignUp = ({ history }) => {
  const handleSignup = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await Firebase.auth().createUserWithEmailAndPassword(
          email.value,
          password.value
        );
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className="flex flex-col items-center bg-black w-full h-full">
      <Header showLogin={true} />
      <form className="flex flex-col pt-10" onSubmit={handleSignup}>
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
          sign up
        </button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
