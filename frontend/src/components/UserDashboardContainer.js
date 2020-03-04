import React from 'react';
import UserDashboard from './UserDashboard';

function UserDashboardContainer() {
  const data = {
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

  return <UserDashboard {...data} />;
}

export default UserDashboardContainer;
