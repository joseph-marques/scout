import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as SettingsIcon } from '../icons/settings-5.svg';

function Navigation() {
  return (
    <nav className="shadow-lg z-50">
      <div className="flex items-center justify-between flex-wrap p-3 px-10 bg-black">
        <div className="flex items-end flex-shrink-0 mr-10">
          <span className="tracking-wider font-black text-5xl pt-2 font-logo text-secondary tracking-tight">
            <Link to="/">scout</Link>
          </span>
        </div>
        <a
          href="#"
          className="inline-block text-sm font-bold font-logo px-4 py-2 leading-none border-2 rounded text-white border-white hover:border-transparent hover:text-primary hover:bg-white mt-4 md:mt-2"
        >
          logout
        </a>
      </div>
      <div
        className="flex items-center justify-between flex-wrap p-1 px-10"
        style={{
          background:
            'linear-gradient(to right, #f2c3a5, #f6b598, #faa78f, #fd978a, #ff8789)'
        }}
      >
        <div className="w-full block flex-grow md:flex md:items-end md:w-auto">
          <div className="md:flex-grow flex">
            <div
              href="#responsive-header"
              className="block md:inline-block font-semibold md:mt-0 text-black text-sm hover:text-white mx-6"
            >
              <NavLink
                to="/"
                exact={true}
                className="py-1 px-2"
                activeClassName="border-t-4 border-white rounded transition-all duration-300 ease-in-out"
              >
                Home
              </NavLink>
            </div>
            <div
              href="#responsive-header"
              className="block md:inline-block font-semibold md:mt-0 text-black text-sm hover:text-white mx-6"
            >
              <NavLink
                to="/scouts"
                className="py-1 px-2"
                activeClassName="border-t-4 border-white rounded transition-all duration-300 ease-in-out"
              >
                Find a Scout
              </NavLink>
            </div>
            <div
              href="#responsive-header"
              className="block md:inline-block font-semibold md:mt-0 text-black text-sm hover:text-white mx-6"
            >
              <NavLink
                to="/settings"
                className="py-1 px-2"
                activeClassName="border-t-4 border-white rounded transition-all duration-300 ease-in-out"
              >
                My Profile
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
