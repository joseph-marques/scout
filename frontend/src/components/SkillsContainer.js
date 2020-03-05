import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import EditSkill from './EditSkill';

function SkillsContainer({ scout, onSkillsUpdate }) {
  const initialSkills = scout.skills || [];
  const [skills, setSkills] = useState(initialSkills);
  const [editIndex, setEditIndex] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const renderSkills = () => {
    return skills.map((skill, i) => {
      return (
        <EditSkill
          key={i}
          skill={skill}
          isEditing={i === editIndex}
          onSkillsUpdate={onSkillsUpdate}
          onEditingFinished={() => setIsDisabled(false)}
        />
      );
    });
  };

  return (
    <div>
      <SectionHeader title={'Skills'}>
        <button
          className={
            isDisabled
              ? 'cursor-default disabled leading-none font-bold tracking-tight text-xs py-1 px-2 border-2 rounded-md text-gray-700 border-gray-700 ml-3 opacity-25'
              : 'leading-none font-bold tracking-tight text-xs py-1 px-2 border-2 rounded-md text-gray-700 border-gray-700 hover:text-black hover:border-black ml-3'
          }
          disabled={isDisabled}
          onClick={() => {
            setIsDisabled(true);
            setEditIndex(skills.length);
            setSkills([...skills, '']);
          }}
        >
          Add New Experience
        </button>
      </SectionHeader>
      {renderSkills()}
    </div>
  );
}

export default SkillsContainer;
