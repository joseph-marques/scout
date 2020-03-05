import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import EditRole from './EditRole';

function RolesContainer({ scout, onRolesUpdate }) {
  const initialRoles = scout.roles || [];
  const [roles, setRoles] = useState(initialRoles);
  const [editIndex, setEditIndex] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const renderRoles = () => {
    return roles.map((role, i) => {
      return (
        <EditRole
          key={i}
          role={role}
          isEditing={i === editIndex}
          onRolesUpdate={onRolesUpdate}
        />
      );
    });
  };

  return (
    <div>
      <SectionHeader title={'Past Experience'}>
        <button
          className="leading-none font-bold tracking-tight text-xs py-1 px-2 border-2 rounded-md text-gray-700 border-gray-700
            hover:text-black hover:border-black ml-3"
          disabled={isDisabled}
          onClick={() => {
            setIsDisabled(true);
            setEditIndex(roles.length);
            setRoles([
              ...roles,
              { title: '', institution: '', tenure: '', type: 'UNKNOWN' }
            ]);
          }}
        >
          Add New Experience
        </button>
      </SectionHeader>
      {renderRoles()}
    </div>
  );
}

export default RolesContainer;
