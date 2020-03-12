import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ScoutList from './ScoutList';

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
