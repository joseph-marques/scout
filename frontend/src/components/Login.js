import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import Firebase from './Firebase';
import { AuthContext } from './Auth';

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
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="password" />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default withRouter(Login);
