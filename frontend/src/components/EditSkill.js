import React, { useState } from 'react';
import LightInput from './LightInput';

function EditSkill(props) {
  const [skill, setSkill] = useState(props.skill);
  const [editing, setEditing] = useState(true);

  return (
    <div className="flex flex-col py-3">
      {editing && props.isEditing ? (
        <React.Fragment>
          <LightInput
            label=""
            name="skill"
            type="text"
            placeholder="Consulting"
            defaultValue={skill}
            onChange={e => {
              setSkill(e.target.value);
            }}
          />
          <button
            className="inline-block tracking-wider text-md font-semibold px-4 py-3 leading-none border-2 border-secondary
          rounded-md text-secondary hover:bg-secondary hover:border-transparent hover:text-white
          bg-white mt-4"
            onClick={() => {
              props.onEditingFinished();
              props.onSkillsUpdate(skill);
              setEditing(false);
            }}
          >
            Save Skill
          </button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p className="text-black font-semibold">{skill}</p>
        </React.Fragment>
      )}
    </div>
  );
}

export default EditSkill;
