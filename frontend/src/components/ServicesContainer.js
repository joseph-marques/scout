import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import EditService from './EditService';

function ServicesContainer({ scout, onServicesUpdate }) {
  const initialServices = scout.services || [];
  const [services, setServices] = useState(initialServices);
  const [editIndex, setEditIndex] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const renderServices = () => {
    return services.map((service, i) => {
      return (
        <EditService
          key={i}
          service={service}
          isEditing={i === editIndex}
          onServicesUpdate={onServicesUpdate}
        />
      );
    });
  };

  return (
    <div>
      <SectionHeader title={'Services'}>
        <button
          className="leading-none font-bold tracking-tight text-xs py-1 px-2 border-2 rounded-md text-gray-700 border-gray-700
            hover:text-black hover:border-black ml-3"
          disabled={isDisabled}
          onClick={() => {
            setIsDisabled(true);
            setEditIndex(services.length);
            setServices([
              ...services,
              { title: '', price: '', description: '', id: 0 }
            ]);
          }}
        >
          Add New Service
        </button>
      </SectionHeader>
      {renderServices()}
    </div>
  );
}

export default ServicesContainer;
