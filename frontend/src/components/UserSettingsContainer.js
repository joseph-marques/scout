import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import UserSettings from './UserSettings';
import { AuthContext } from './Auth';

const SCOUT_DATA = gql`
  fragment ScoutData on Scout {
    id
    firstname
    lastname
    bio
    roles {
      title
      institution
      tenure
      type
    }
    skills
    services {
      id
      title
      description
      price
    }
  }
`;

const SCOUT_QUERY = gql`
  ${SCOUT_DATA}
  query Scout($id: ID!) {
    scout(id: $id) {
      ...ScoutData
    }
  }
`;

const UPDATE_SCOUT_MUTATION = gql`
  ${SCOUT_DATA}
  mutation updateScout($scout: ScoutInput!) {
    updateScout(scout: $scout) {
      ...ScoutData
    }
  }
`;

function UserSettingsContainer() {
  const { currentUser } = useContext(AuthContext);
  const [updateScout] = useMutation(UPDATE_SCOUT_MUTATION);
  const { loading, error, data } = useQuery(SCOUT_QUERY, {
    variables: { id: currentUser.uid }
  });

  if (loading) {
    console.log('loading...');
    return 'loading...';
  }
  if (error) {
    console.log(`error: ${error}`);
    return 'error';
  }

  const handlePersonalDetailUpdate = personalDetails => {
    const updatedScoutData = { ...data.scout, ...personalDetails };
    updateScout({ variables: { scout: updatedScoutData } });
  };

  console.log(data);

  return (
    <UserSettings
      onPersonalDetailUpdate={handlePersonalDetailUpdate}
      {...data}
    />
  );
}

export default UserSettingsContainer;
