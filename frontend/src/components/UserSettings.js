import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import Card from './Card';
import LightInput from './LightInput';
import TextArea from './TextArea';
import Radio from './Radio';
import ServicesContainer from './ServicesContainer';
import RolesContainer from './RolesContainer';
import SkillsContainer from './SkillsContainer';

function CheckBox({ label, name, checked, onChange }) {
  return (
    <label className="flex my-3 w-full flex-start items-center">
      <input
        className="rounded-md p-2 bg-gray-200 border-transparent focus:border-secondary border-2"
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p className="px-2 text-sm text-sm text-gray-700">{label}</p>
    </label>
  );
}

function PersonalDetails({ scout, onPersonalDetailUpdate }) {
  const [isListed, setIsListed] = useState(scout.isListed);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        const { firstname, lastname, bio } = event.target.elements;

        onPersonalDetailUpdate({
          firstname: firstname.value,
          lastname: lastname.value,
          bio: bio.value,
          isListed
        });
      }}
      className="w-full flex flex-col pt-4 px-4 m-auto max-w-xl"
    >
      <LightInput
        label="First Name"
        name="firstname"
        type="text"
        value={scout.firstname}
        placeholder="First Name"
      />
      <LightInput
        label="Last Name"
        name="lastname"
        type="text"
        value={scout.lastname}
        placeholder="Last Name"
      />
      <TextArea
        label="Bio"
        name="bio"
        value={scout.bio}
        placeholder="Enter a short bio about yourself and how you can help others."
      />
      <CheckBox
        label="Make Profile Public?"
        name="isListed"
        checked={isListed}
        onChange={() => setIsListed(!isListed)}
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
    <div className="flex flex-col py-6 lg:flex-row justify-center align-center items-center lg:items-start">
      <div className="p-3 w-full lg:w-1/2 max-w-lg lg:max-w-2xl">
        <Card>
          <SectionHeader title={'Personal Details'} />
          <PersonalDetails {...props} />
        </Card>
        <br />
        <Card>
          <RolesContainer {...props} />
        </Card>
      </div>
      <div className="p-3 w-full lg:w-1/2 max-w-lg lg:max-w-2xl">
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
