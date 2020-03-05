import React from 'react';
import Header from './Header';
import Input from './Input';

const SignUp = ({ onSignUp }) => {
  return (
    <div className="flex flex-col items-center bg-black w-full h-full">
      <Header showLogin={true} />
      <div className="flex-1 w-full content-center overflow-y-auto">
        <form
          className="flex flex-col pt-10 px-4 m-auto max-w-lg"
          onSubmit={onSignUp}
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
            sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
