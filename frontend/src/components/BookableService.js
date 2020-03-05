import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from './Auth';
import TextArea from './TextArea';
import 'react-datepicker/dist/react-datepicker.css';

const UPDATE_APPOINTMENT_MUTATION = gql`
  mutation updateAppointment($appointment: AppointmentInput!) {
    updateAppointment(appointment: $appointment) {
      id
      when
      status
    }
  }
`;

const Service = ({ title, price, description, disabled, onClick }) => {
  return (
    <div className="py-3 flex flex-col">
      <div className="flex items-center justify-between pb-3">
        <p className="text-black font-medium">{title}</p>
        <div className="w-1/3 m:w-1/4 pl-2 ml-2">
          <button
            disabled={disabled}
            onClick={onClick}
            className={
              disabled
                ? `cursor-default disabled opacity-25 block w-full text-center text-sm text-primary 
              font-bold px-4 py-2 leading-none border-2 rounded border-primary mt-4 md:mt-2`
                : `block w-full text-center text-sm text-primary 
              font-bold px-4 py-2 leading-none border-2 rounded border-primary
              hover:border-transparent hover:text-white hover:bg-primary disabled:opacity-25 mt-4 md:mt-2`
            }
          >
            {price}
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
};

const BookingWindow = ({ onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [note, setNote] = useState('');

  return (
    <div className="pb-4">
      <div className="flex items-center">
        <p className="px-2 pr-4 text-sm text-sm text-gray-700">
          Select a date:
        </p>
        <DatePicker
          className="w-full rounded-md p-2 bg-gray-200 border-transparent focus:border-secondary border-2"
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
        />
      </div>
      <TextArea
        label="Note"
        name="note"
        placeholder="Space for a note about the appointment"
        value={note}
        onChange={e => setNote(e.target.value)}
      />
      <button
        onClick={() => {
          onConfirm({ note, when: selectedDate.toISOString() });
        }}
        className="block w-full text-center text-sm text-primary
            font-bold px-4 py-2 leading-none border-2 rounded border-primary
            hover:border-transparent hover:text-white hover:bg-primary mt-4 md:mt-2"
      >
        Request Appointment
      </button>
    </div>
  );
};

const BookableService = ({ service, withId }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [updateAppointment] = useMutation(UPDATE_APPOINTMENT_MUTATION);
  const { currentUser } = useContext(AuthContext);
  const apptInput = {
    id: Math.floor(Math.random() * 16777215).toString(16),
    serviceid: service.id,
    status: 'REQUESTED',
    requesterid: currentUser.uid,
    withid: withId
  };

  const handleConfirm = additionalInputData => {
    const appointment = { ...apptInput, ...additionalInputData };
    updateAppointment({ variables: { appointment } });
    setIsBooking(false);
  };

  return (
    <React.Fragment>
      <Service
        disabled={isBooking}
        onClick={() => setIsBooking(true)}
        {...service}
      />
      {isBooking && <BookingWindow onConfirm={handleConfirm} />}
    </React.Fragment>
  );
};

export default BookableService;
