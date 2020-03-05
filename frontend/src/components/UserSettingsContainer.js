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
    services {
      id
      title
      description
      price
    }
    roles {
      title
      institution
      tenure
      type
    }
    skills
    isListed
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
    return 'loading...';
  }
  if (error) {
    return 'Something went wrong';
  }

  // TODO skills update

  const handlePersonalDetailUpdate = personalDetails => {
    const updatedScoutData = { ...data.scout, ...personalDetails };
    updateScout({ variables: { scout: updatedScoutData } });
  };

  const handleServicesUpdate = newService => {
    const existingServices = data.scout.services || [];
    const services = [...existingServices, newService].map((service, i) => {
      return { ...service, id: `${i + 1}` };
    });
    const updatedScoutData = { ...data.scout, services };
    updateScout({ variables: { scout: updatedScoutData } });
  };

  const handleRolesUpdate = newRole => {
    const existingRoles = data.scout.roles || [];
    const roles = [...existingRoles, newRole];
    const updatedScoutData = { ...data.scout, roles };
    updateScout({ variables: { scout: updatedScoutData } });
  };

  const handleSkillsUpdate = newSkill => {
    const existingSkills = data.scout.skills || [];
    const skills = [...existingSkills, newSkill];
    const updatedScoutData = { ...data.scout, skills };
    updateScout({ variables: { scout: updatedScoutData } });
  };

  return (
    <UserSettings
      onPersonalDetailUpdate={handlePersonalDetailUpdate}
      onServicesUpdate={handleServicesUpdate}
      onRolesUpdate={handleRolesUpdate}
      onSkillsUpdate={handleSkillsUpdate}
      {...data}
    />
  );
}

export default UserSettingsContainer;
