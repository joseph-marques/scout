import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';

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
        {renderNavLink({ title: 'Dashboard', link: '/dashboard', exact: true })}
        {renderNavLink({ title: 'Find a Scout', link: '/scouts' })}
        {renderNavLink({ title: 'My Profile', link: '/settings' })}
      </div>
    );
  };

  return (
    <nav className="shadow-lg z-50">
      <Header showLogout={true} />
      {renderSubHeader()}
    </nav>
  );
}

export default Navigation;
