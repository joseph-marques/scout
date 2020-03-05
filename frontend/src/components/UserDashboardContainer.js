import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import UserDashboard from './UserDashboard';
import { AuthContext } from './Auth';

const FAKE_DATA = {
  appointments: [],
  scheduledAppointments: [
    {
      when: '20200224T020000-0800',
      status: 'PAST',
      service: {
        title: 'Consulting Industry Discussion'
      },
      scout: {
        firstName: 'Ike',
        lastName: 'Ziemann'
      },
      requester: {},
      note: '',
      comments: [
        {
          comment: 'Looking forward to it!',
          author: {
            firstName: 'Ike',
            lastName: 'Ziemann'
          }
        },
        {
          comment: 'Looking forward to it!',
          author: {
            firstName: 'Ike',
            lastName: 'Ziemann'
          }
        }
      ]
    },
    {
      when: '20200224T020000-0800',
      status: 'PAST',
      service: {
        title: 'Consulting Industry Discussion'
      },
      scout: {
        firstName: 'Ike',
        lastName: 'Ziemann'
      },
      requester: {},
      note: '',
      comments: [
        {
          comment: 'Looking forward to it!',
          author: {
            firstName: 'Ike',
            lastName: 'Ziemann'
          }
        },
        {
          comment: 'Looking forward to it!',
          author: {
            firstName: 'Ike',
            lastName: 'Ziemann'
          }
        }
      ]
    }
  ],
  isListed: false
};

const APPOINTMENT_DATA = gql`
  fragment AppointmentData on Appointment {
    id
    when
    status
    note
    service {
      id
      title
      description
      price
    }
    requester {
      id
      firstname
      lastname
    }
    with {
      id
      firstname
      lastname
    }
    comments {
      comment
      author {
        firstname
        lastname
      }
    }
  }
`;

const SCOUT_QUERY = gql`
  ${APPOINTMENT_DATA}
  query Scout($id: ID!) {
    scout(id: $id) {
      id
      isListed
      firstname
      lastname
      appointmentsWithOthers {
        ...AppointmentData
      }
      appointmentsWithMe {
        ...AppointmentData
      }
    }
  }
`;

function UserDashboardContainer() {
  const { currentUser } = useContext(AuthContext);
  const { loading, error, data } = useQuery(SCOUT_QUERY, {
    variables: { id: currentUser.uid }
  });

  if (loading) {
    return 'loading...';
  }

  if (error) {
    console.log(error);
    return 'Something went wrong';
  }

  return <UserDashboard {...data.scout} />;
}

export default UserDashboardContainer;
