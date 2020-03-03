import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import mentorImage from '../images/mentor.jpg';

function Home() {
  return (
    <div classNameName="flex flex-col items-center bg-black w-full h-full">
      <Header showLogin={true} />
      <div class="relative bg-white overflow-hidden">
        <div className="relative z-10 bg-white md:max-w-xl md:w-full">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8">
            <div className="sm:text-center md:text-left py-8 md:py-20">
              <h2 className="text-4xl tracking-tight text-black font-logo font-extrabold sm:text-5xl sm:leading-none md:text-6xl">
                Accelerate your project.
              </h2>
              <h2 className="text-4xl pt-6 pr-6 tracking-tight text-secondary font-logo font-extrabold sm:text-5xl sm:leading-none md:text-6xl">
                Get help from an expert.
              </h2>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </p>
              <div className="mt-5 sm:mt-8 flex content-center justify-center md:justify-start">
                <Link
                  to="/signup"
                  className="text-md font-logo px-12 py-3 leading-none border-2 leading-6 
                  rounded-md text-secondary text-center border-secondary hover:text-white
                  hover:bg-secondary mt-4 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-24"
                >
                  sign up
                </Link>
              </div>
            </div>
            <svg
              className="hidden md:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            src={mentorImage}
            alt=""
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          />
        </div>
      </div>
      foobar
    </div>
  );
}

export default Home;
