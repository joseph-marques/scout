import React from 'react';
import { Link } from 'react-router-dom';
import Firebase from '../clients/Firebase';

function Header({ showLogin = false, showLogout = false }) {
  const link = showLogout ? '/home' : '/';
  return (
    <div className="flex bg-black content-start w-full items-center justify-between flex-shrink-0 p-3 px-10">
      <span className="tracking-wider font-black text-5xl pt-2 font-logo text-secondary tracking-tight">
        <Link to={link}>scout</Link>
      </span>
      {showLogin && (
        <Link
          to="/login"
          className="inline-block text-md font-logo px-4 py-2 mt-3 leading-none border-2
          rounded-md text-white text-sm text-center border-white hover:text-primary
          hover:bg-white"
        >
          log in
        </Link>
      )}
      {showLogout && (
        <button
          className="inline-block text-md font-logo px-4 py-2 mt-3 leading-none border-2
          rounded-md text-white text-sm text-center border-white hover:text-primary
          hover:bg-white"
          onClick={() => Firebase.auth().signOut()}
        >
          logout
        </button>
      )}
    </div>
  );
}

export default Header;
