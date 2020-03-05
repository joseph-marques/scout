import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Appointment from './Appointment';
import Card from './Card';
import SectionHeader from './SectionHeader';

const UserDashboard = props => {
  const renderScoutRequests = () => {
    return (
      <Fragment>
        <SectionHeader title={'Upcoming Bookings'} />
        {renderAppointments({
          appointments: props.appointmentsWithMe,
          past: false,
          withMe: true,
          emptyMessage: `Your profile has been published! Other users can now request your 
            services. Any new request will show up here.`
        })}
      </Fragment>
    );
  };

  const renderCallToAction = () => {
    return (
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

  const renderAppointments = ({
    appointments,
    emptyMessage,
    showLink = false,
    past = false,
    withMe = false
  }) => {
    const appts = appointments.filter(appt => {
      if (past) {
        return appt.status === 'PAST';
      } else {
        return appt.status === 'REQUESTED' || appt.status === 'CONFIRMED';
      }
    });

    if (appts.length <= 0) {
      return (
        <Fragment>
          <p className="text-gray-700 text-base py-4">{emptyMessage}</p>
          {showLink && (
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

    return appts.map((appt, i) => {
      return (
        <Appointment
          key={i}
          withMe={withMe}
          appointment={appt}
          scoutInfo={{
            id: props.id,
            firstname: props.firstname,
            lastname: props.lastname
          }}
        />
      );
    });
  };

  return (
    <div className="flex flex-col py-6 lg:flex-row justify-center align-center items-center lg:items-start">
      <div className="p-3 w-full lg:w-1/2 max-w-lg lg:max-w-2xl">
        <Card>
          <SectionHeader title={'Upcoming'} />
          {renderAppointments({
            appointments: props.appointmentsWithOthers,
            emptyMessage: 'You have no upcoming appointments.',
            past: false,
            showLink: true
          })}
          <br />
          <SectionHeader title={'Past'} />
          {renderAppointments({
            appointments: props.appointmentsWithOthers,
            emptyMessage: 'You have no past appointments.',
            past: true
          })}
        </Card>
      </div>
      <div className="p-3 w-full lg:w-1/2 max-w-lg lg:max-w-2xl">
        <Card>
          {props.isListed ? renderScoutRequests() : renderCallToAction()}
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
