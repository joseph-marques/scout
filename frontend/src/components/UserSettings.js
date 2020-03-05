import React from 'react';
import SectionHeader from './SectionHeader';
import Card from './Card';

function Input({ label, name, type, placeholder, value }) {
  return (
    <label className="flex flex-col my-3 w-full">
      <p className="px-2 text-sm text-sm text-gray-700">{label}</p>
      <input
        className="w-full rounded-md p-2 bg-gray-200 border-transparent focus:border-secondary border-2"
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
      />
    </label>
  );
}

function TextArea({ label, name, placeholder, value }) {
  return (
    <label className="flex flex-col my-3 w-full">
      <p className="px-2 text-sm text-sm text-gray-700">{label}</p>
      <textarea
        className="w-full rounded-md p-2 bg-gray-200 border-transparent focus:border-secondary border-2"
        name={name}
        placeholder={placeholder}
        defaultValue={value}
      />
    </label>
  );
}

function PersonalDetails({ scout, onPersonalDetailUpdate }) {
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        const { firstname, lastname, bio } = event.target.elements;

        onPersonalDetailUpdate({
          firstname: firstname.value,
          lastname: lastname.value,
          bio: bio.value
        });
      }}
      className="w-full flex flex-col pt-4 px-4 m-auto max-w-xl"
    >
      <Input
        label="First Name"
        name="firstname"
        type="text"
        value={scout.firstname}
        placeholder="First Name"
      />
      <Input
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

      <button
        className="inline-block tracking-wider text-md font-semibold px-4 py-3 leading-none border-2 hover:border-secondary
          rounded-md hover:text-secondary bg-secondary border-transparent text-white
          hover:bg-white mt-4"
        type="submit"
      >
        Save Personal Details
      </button>
    </form>
  );
}

function UserSettings(props) {
  console.log(props);
  return (
    <div className="flex flex-col py-6 lg:flex-row justify-center align-center items-center lg:items-start">
      <div className="p-3 w-full lg:w-1/2 max-w-lg lg:max-w-2xl">
        <Card>
          <SectionHeader title={'Personal Details'} />
          <PersonalDetails {...props} />
        </Card>
      </div>
      <div className="p-3 w-full lg:w-1/2 max-w-lg lg:max-w-2xl">
        <Card>
          <SectionHeader title={'Services'} />
        </Card>
      </div>
    </div>
  );
}

export default UserSettings;
