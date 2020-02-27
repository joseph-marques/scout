import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as SettingsIcon } from '../icons/settings-5.svg';

function Navigation() {
  const renderNavLink = ({ title, link, exact = false }) => {
    return (
      <div className="font-semibold tracking-wide text-black text-sm hover:text-white mx-4 py-1 sm:mx-6">
        <NavLink
          to={link}
          exact={exact}
          className="py-1 h-10 px-2"
          style={{ paddingTop: '0.35rem' }}
          activeClassName="border-t-4 border-white rounded transition-all duration-300 ease-in-out"
        >
          {title}
        </NavLink>
      </div>
    );
  };

  const renderSubHeader = () => {
    return (
      <div
        className="flex items-center flex-start flex-wrap m-0 p-0"
        style={{
          background:
            'linear-gradient(to right, #f2c3a5, #f6b598, #faa78f, #fd978a, #ff8789)'
        }}
      >
        {renderNavLink({ title: 'Home', link: '/', exact: true })}
        {renderNavLink({ title: 'Find a Scout', link: '/scouts' })}
        {renderNavLink({ title: 'My Profile', link: '/settings' })}
      </div>
    );
  };

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
      {renderSubHeader()}
    </nav>
  );
}

export default Navigation;
