import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import SectionHeader from './SectionHeader';
import Card from './Card';
import Input from './Input';
import CheckBox from './Checkbox';
import TextArea from './TextArea';
import ServicesContainer from './ServicesContainer';
import RolesContainer from './RolesContainer';
import SkillsContainer from './SkillsContainer';
import useForm from './useForm';

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

const UPDATE_SCOUT_MUTATION = gql`
  ${SCOUT_DATA}
  mutation updateScout($scout: ScoutInput!) {
    updateScout(scout: $scout) {
      ...ScoutData
    }
  }
`;

function PersonalDetails({ scout }) {
  const [updateScout] = useMutation(UPDATE_SCOUT_MUTATION);
  const callback = formData => {
    const updatedScoutData = { id: scout.id, ...formData };
    updateScout({
      variables: { scout: updatedScoutData }
    });
  };
  const { inputs, handleInputChange, handleSubmit } = useForm(callback);
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col pt-4 px-4 m-auto "
    >
      <Input
        label="First Name"
        name="firstname"
        type="text"
        placeholder="First Name"
        light={true}
        required={true}
        defaultValue={scout.firstname}
        onChange={handleInputChange}
      />
      <Input
        label="Last Name"
        name="lastname"
        type="text"
        placeholder="Last Name"
        light={true}
        required={true}
        defaultValue={scout.lastname}
        onChange={handleInputChange}
      />
      <TextArea
        label="Bio"
        name="bio"
        placeholder="Enter a short bio about yourself and how you can help others."
        required={true}
        defaultValue={scout.bio}
        onChange={handleInputChange}
      />
      <CheckBox
        label="Make Profile Public?"
        name="isListed"
        defaultChecked={scout.isListed}
        onChange={handleInputChange}
      />

      <button
        className="inline-block tracking-wider text-md font-semibold px-4 py-3 leading-none border-2 border-secondary
          rounded-md text-secondary hover:bg-secondary hover:border-transparent hover:text-white
          bg-white mt-4"
        type="submit"
      >
        Save Personal Details
      </button>
    </form>
  );
}

function UserSettings(props) {
  return (
    <div className="flex flex-col py-6 justify-center align-center items-center">
      <div className="p-3 w-full max-w-4xl">
        <Card>
          <SectionHeader title={'Personal Details'} />
          <PersonalDetails {...props} />
        </Card>
        <br />
        <Card>
          <RolesContainer {...props} />
        </Card>
        <br />
        <Card>
          <ServicesContainer {...props} />
        </Card>
        <br />
        <Card>
          <SkillsContainer {...props} />
        </Card>
      </div>
    </div>
  );
}

export default UserSettings;
