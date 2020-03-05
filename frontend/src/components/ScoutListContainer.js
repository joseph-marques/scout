import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ScoutList from './ScoutList';

const FAKE_DATA = {
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

// TODO: Add search
const SCOUTS_QUERY = gql`
  {
    scouts {
      id
      firstName: firstname
      lastName: lastname
      bio
      roles {
        title
        institution
        tenure
      }
      skills
      rating {
        rating
        count
      }
    }
  }
`;

function ScoutListContainer() {
  const { loading, error, data } = useQuery(SCOUTS_QUERY);
  if (loading) {
    return 'loading...';
  }
  if (error) {
    console.log(`error: ${error}`);
    return 'error';
  }

  return <ScoutList {...data} />;
}

export default ScoutListContainer;
