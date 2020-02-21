import React from 'react';

function ExperienceSection(props) {
  const renderExperiences = () => {
    return props.experiences.map((experience, i) => {
      return <div key={i}>{experience}</div>;
    });
  };
  return (
    <div>
      <div className="text-2xl font-serif -mb-2 font-bold tracking-wide">
        {props.title}
      </div>
      {renderExperiences()}
    </div>
  );
}

export default ExperienceSection;
