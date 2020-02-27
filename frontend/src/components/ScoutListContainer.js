import React from 'react';
import ScoutList from './ScoutList';

function ScoutListContainer() {
  const data = {
    scouts: [
      {
        id: 1,
        firstName: 'Ike',
        lastName: 'Ziemann',
        role: {
          title: 'Sr. Consultant',
          institution: 'Deloitte'
        },
        skills: ['Consulting Interviews', 'Business', 'Management Consulting'],
        reviewSummary: {
          rating: 3.8,
          count: 48
        }
      },
      {
        id: 2,
        firstName: 'Nels',
        lastName: 'Beatty',
        role: {
          title: 'Software Engineer',
          institution: 'Braintree'
        },
        skills: [
          'Web Development',
          'Software Engineering Interviews',
          'Technology'
        ],
        reviewSummary: {
          rating: 4.3,
          count: 12
        }
      },
      {
        id: 3,
        firstName: 'Madonna',
        lastName: 'Grady',
        role: {
          title: 'Associate',
          institution: 'Goldman Sachs'
        },
        skills: ['Resume Review', 'Business'],
        reviewSummary: {
          rating: 5.0,
          count: 7
        }
      },
      {
        id: 4,
        firstName: 'Travis',
        lastName: 'Wintheiser',
        role: {
          title: 'MPP Student',
          institution: 'University of Chicago'
        },
        skills: [
          'College Application Assistance',
          'Resume Review',
          'Public Policy'
        ],
        reviewSummary: {
          rating: 4.2,
          count: 98
        }
      },
      {
        id: 5,
        firstName: 'Jayne',
        lastName: 'Moore',
        role: {
          title: 'Data Scientist',
          institution: 'Google'
        },
        skills: ['Data Science', 'Technology'],
        reviewSummary: {
          rating: 3.4,
          count: 64
        }
      }
    ]
  };

  return <ScoutList scouts={data.scouts} />;
}

export default ScoutListContainer;
