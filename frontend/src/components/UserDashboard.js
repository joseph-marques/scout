import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Appointment from './Appointment';
import Card from './Card';
import SectionHeader from './SectionHeader';

const UserDashboard = props => {
  const renderScoutRequests = () => {
    return (
      // if not a scout
      <Fragment>
        <SectionHeader title={'Become a Scout'} />
        <p className="text-gray-700 text-base py-4">
          Complete your profile to become a Scout and offer your expertise.
        </p>
        <div className="flex flex-col items-center">
          <Link
            to="/settings"
            className="w-2/3 font-bold px-4 py-3 leading-none border-2
          rounded-md text-primary text-center border-primary hover:text-white
          hover:bg-primary mt-4"
          >
            Complete Your Profile
          </Link>
        </div>
      </Fragment>
    );
  };

  const renderAppointments = ({ past = false }) => {
    const pastAppointments = props.scheduledAppointments.filter(appt => {
      if (past) {
        return appt.status === 'PAST';
      } else {
        return appt.status !== 'PAST';
      }
    });

    if (pastAppointments.length <= 0) {
      return (
        <Fragment>
          <p className="text-gray-700 text-base py-4">
            {past
              ? 'You have no past appointments.'
              : 'You have no upcoming appointments.'}
          </p>
          {!past && (
            <div className="flex flex-col items-center">
              <Link
                to="/scouts"
                className="w-2/3 font-bold px-4 py-3 leading-none border-2
          rounded-md text-primary text-center border-primary hover:text-white
          hover:bg-primary mt-4"
              >
                Find a Scout to Get Started
              </Link>
            </div>
          )}
        </Fragment>
      );
    }

    return pastAppointments.map(appt => {
      return <Appointment {...appt} />;
    });
  };

  return (
    <div className="flex flex-col py-6 lg:flex-row justify-center align-center items-center lg:items-start">
      <div className="p-3 w-full lg:w-1/2 max-w-lg lg:max-w-2xl">
        <Card>
          <SectionHeader title={'Upcoming'} />
          {renderAppointments({ past: false })}
          <br />
          <SectionHeader title={'Past'} />
          {renderAppointments({ past: true })}
        </Card>
      </div>
      <div className="p-3 w-full lg:w-1/2 max-w-lg lg:max-w-2xl">
        <Card>{renderScoutRequests()}</Card>
      </div>
    </div>
  );
};

export default UserDashboard;
