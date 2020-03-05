import React, { useState } from 'react';
import LightInput from './LightInput';
import TextArea from './TextArea';

function EditService(props) {
  const [service, setService] = useState(props.service);
  const [editing, setEditing] = useState(true);

  return (
    <div className="flex flex-col py-3">
      {editing && props.isEditing ? (
        <React.Fragment>
          <LightInput
            label="Title"
            name="title"
            type="text"
            placeholder="Consulting Interview Prep"
            defaultValue={service.title}
            onChange={e => {
              setService({ ...service, title: e.target.value });
            }}
          />
          <LightInput
            label="Price"
            name="price"
            type="text"
            placeholder="$25"
            defaultValue={service.price}
            onChange={e => {
              setService({ ...service, price: e.target.value });
            }}
          />
          <TextArea
            label="Description"
            name="description"
            placeholder={`I will spend an hour helping you prep for consulting interviews.
          `}
            defaultValue={service.description}
            onChange={e => {
              setService({ ...service, description: e.target.value });
            }}
          />
          <button
            className="inline-block tracking-wider text-md font-semibold px-4 py-3 leading-none border-2 border-secondary
          rounded-md text-secondary hover:bg-secondary hover:border-transparent hover:text-white
          bg-white mt-4"
            onClick={() => {
              props.onServicesUpdate(service);
              setEditing(false);
            }}
          >
            Save Services
          </button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="flex justify-between">
            <p className="text-black font-semibold">{service.title}</p>
            <p className="text-black text-xl font-serif font-bold">
              {service.price}
            </p>
          </div>
          <p className="text-gray-700">{service.description}</p>
        </React.Fragment>
      )}
    </div>
  );
}

export default EditService;
