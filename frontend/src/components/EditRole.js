import React, { useState } from 'react';
import Input from './Input';
import Radio from './Radio';

function EditRole(props) {
  const [role, setRole] = useState(props.role);
  const [editing, setEditing] = useState(true);

  return (
    <div className="flex flex-col py-3">
      {editing && props.isEditing ? (
        <React.Fragment>
          <Input
            label="Title"
            name="title"
            type="text"
            light={true}
            placeholder="Sr. Consultant"
            defaultValue={role.title}
            onChange={e => {
              setRole({ ...role, title: e.target.value });
            }}
          />
          <Input
            label="Institution"
            name="institution"
            type="text"
            light={true}
            placeholder="Not Real Inc."
            defaultValue={role.institution}
            onChange={e => {
              setRole({ ...role, institution: e.target.value });
            }}
          />
          <Input
            label="Tenure"
            name="tenure"
            type="text"
            placeholder="2010 - 2014"
            defaultValue={role.tenure}
            onChange={e => {
              setRole({ ...role, tenure: e.target.value });
            }}
          />
          <Radio
            label="Work"
            name="work"
            checked={role.type === 'WORK'}
            onChange={e => {
              setRole({ ...role, type: 'WORK' });
            }}
          />
          <Radio
            label="Education"
            name="education"
            checked={role.type === 'EDUCATION'}
            onChange={e => {
              setRole({ ...role, type: 'EDUCATION' });
            }}
          />

          <button
            className="inline-block tracking-wider text-md font-semibold px-4 py-3 leading-none border-2 border-secondary
          rounded-md text-secondary hover:bg-secondary hover:border-transparent hover:text-white
          bg-white mt-4"
            onClick={() => {
              props.onRolesUpdate(role);
              props.onEditingFinished();
              setEditing(false);
            }}
          >
            Save Roles
          </button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p className="text-black font-semibold">{role.title}</p>
          <p className="text-gray-700">
            {`${role.institution}, ${role.tenure}`}
          </p>
        </React.Fragment>
      )}
    </div>
  );
}

export default EditRole;
