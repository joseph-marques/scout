import React from 'react';

function ExperienceSection(props) {
  const renderExperiences = () => {
    return props.experiences.map((experience, i) => {
      return (
        <div className="text-gray-700" key={i}>
          {experience}
        </div>
      );
    });
  };
  return (
    <div>
      <div className="text-xl font-serif  font-bold tracking-wide pb-1">
        {props.title}
      </div>
      {renderExperiences()}
    </div>
  );
}

export default ExperienceSection;
