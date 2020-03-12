import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import ScoutProfile from './ScoutProfile';
import ScrollToTop from './ScrollToTop';

const SCOUT_QUERY = gql`
  query Scout($id: ID!) {
    scout(id: $id) {
      id
      firstName: firstname
      lastName: lastname
      bio
      roles {
        title
        institution
        tenure
        type
      }
      skills
      reviewSummary: rating {
        rating
        count
      }
      services {
        id
        title
        description
        price
      }
      reviews {
        author {
          firstName: firstname
          lastName: firstname
        }
        rating
        subject {
          id
        }
        text
      }
    }
  }
`;

function ScoutProfileContainer() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(SCOUT_QUERY, {
    variables: { id: id }
  });
  if (loading) {
    return 'loading...';
  }
  if (error) {
    console.log(`error: ${error}`);
    return 'error';
  }

  return (
    <Fragment>
      <ScrollToTop />
      <ScoutProfile {...data.scout} />;
    </Fragment>
  );
}

export default ScoutProfileContainer;
