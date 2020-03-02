import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Home() {
  return (
    <div className="flex flex-col items-center bg-black w-full h-full">
      <Header showLogin={true} />
      <Link to="/signup">signup</Link>
    </div>
  );
}

export default Home;
