import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const UPDATE_APPOINTMENT_MUTATION = gql`
  mutation updateAppointment($appointment: AppointmentInput!) {
    updateAppointment(appointment: $appointment) {
      id
      status
    }
  }
`;

const ADD_COMMENT_MUTATION = gql`
  mutation addComment($appointmentId: ID!, $comment: AppointmentCommentInput!) {
    commentOnAppointment(appointmentID: $appointmentId, comment: $comment)
  }
`;

function Appointment(props) {
  const [appointment, setAppointment] = useState(props.appointment);
  const [inputValue, setInputValue] = useState('');
  const [updateAppointment] = useMutation(UPDATE_APPOINTMENT_MUTATION);
  const [addComment] = useMutation(ADD_COMMENT_MUTATION);

  const formatDate = () => {
    const date = new Date(appointment.when);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);

    const [month, day] = formattedDate.replace(/,/g, '').split(' ');

    return (
      <div className="flex flex-col items-center pr-4 mt-2">
        <span className="font-serif text-4xl font-extrabold -mb-5">{day}</span>
        <span className="font-serif text-xl">{month}</span>
      </div>
    );
  };

  const renderComments = () => {
    const comments = appointment.comments || [];

    return comments.map(({ comment, author }, i) => {
      return (
        <div key={i} className="flex flex-col py-1 pl-2">
          <span className="text-sm text-black">{comment}</span>
          <span className="text-xs text-gray-700">{`${author.firstname} ${author.lastname}`}</span>
        </div>
      );
    });
  };

  const handleAddComment = event => {
    event.preventDefault();
    const existingComments = appointment.comments || [];
    const { comment } = event.target.elements;

    if (comment.value.trim() === '') {
      return;
    }

    const newComments = [
      ...existingComments,
      {
        comment: comment.value,
        author: {
          firstname: props.scoutInfo.firstname,
          lastname: props.scoutInfo.lastname
        }
      }
    ];

    setAppointment({ ...appointment, comments: newComments });
    setInputValue('');
    addComment({
      variables: {
        appointmentId: appointment.id,
        comment: { author: props.scoutInfo.id, comment: comment.value }
      }
    });
  };

  const formatInput = status => ({
    id: appointment.id,
    when: appointment.when,
    status: status,
    serviceid: appointment.service.id,
    requesterid: appointment.requester.id,
    withid: appointment.with.id,
    note: appointment.note
  });

  return (
    <div className="flex items-start w-full">
      {formatDate()}
      <div className="py-3 flex flex-col w-full">
        <div className="flex w-full justify-between">
          <div className="flex flex-col flex-1 items-start justify-between pb-3">
            <p className="text-black text-lg font-medium">{`${appointment.with.firstname} ${appointment.with.lastname}`}</p>
            <p className="text-md text-gray-700">{appointment.service.title}</p>
          </div>
          <p className="text-xs text-gray-700">
            {appointment.status.toLowerCase()}
          </p>
          <div>
            {/* TODO */}
            {appointment.status === 'PAST' && !props.withMe && (
              <button
                className="leading-none font-bold tracking-tight text-xs py-1 px-2 text-gray-700
            hover:text-black hover:border-black ml-3"
              >
                Review
              </button>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-700">{appointment.note}</p>
        <div className="flex w-full justify-center">
          {props.withMe && (
            <React.Fragment>
              <button
                onClick={() => {
                  setAppointment({ ...appointment, status: 'CANCELLED' });
                  const appointmentInput = formatInput('CANCELLED');
                  updateAppointment({
                    variables: { appointment: appointmentInput }
                  });
                }}
                className="leading-none font-bold tracking-tight text-xs my-3 py-1 px-3 w-1/3 border-2 rounded-md text-gray-700 border-gray-700
            hover:text-black hover:border-black ml-3"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setAppointment({ ...appointment, status: 'CONFIRMED' });
                  const appointmentInput = formatInput('CONFIRMED');
                  updateAppointment({
                    variables: { appointment: appointmentInput }
                  });
                }}
                className="leading-none font-bold tracking-tight text-xs my-3 py-1 px-3 w-1/3 border-2 rounded-md text-gray-700 border-gray-700
            hover:text-black hover:border-black ml-3"
              >
                Confirm
              </button>
            </React.Fragment>
          )}
        </div>
        <br className="h-4" />
        {renderComments()}
        <form
          onSubmit={handleAddComment}
          className="flex items-center content-center"
        >
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            name="comment"
            className="bg-gray-200 text-sm px-2 rounded-md py-1 flex-auto"
            type="text"
          />
          <button
            type="submit"
            className="leading-none font-bold tracking-tight text-xs py-1 px-2 border-2 rounded-md text-gray-700 border-gray-700
            hover:text-black hover:border-black ml-3"
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default Appointment;
