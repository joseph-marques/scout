import React from 'react';
import SectionHeader from './SectionHeader';

function ExperienceSection(props) {
  const renderExperiences = () => {
    return props.experiences.map((experience, i) => {
      return (
        <div key={i} className="my-4">
          <p className="text-black">{experience.title}</p>
          <p className="text-gray-700 text-sm">
            {`${experience.institution}, ${experience.tenure}`}
          </p>
        </div>
      );
    });
  };

  return (
    <div>
      <SectionHeader title={props.title} />
      {renderExperiences()}
    </div>
  );
}

export default ExperienceSection;
