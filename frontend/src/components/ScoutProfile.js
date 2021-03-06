import React from 'react';
import { ReactComponent as UserIcon } from '../icons/user-4.svg';
import Card from './Card';
import ExperienceSection from './ExperienceSection';
import SectionHeader from './SectionHeader';
import FullRating from './FullRating';
import Skill from './Skill';
import Review from './Review';
import BookableService from './BookableService';

function ScoutProfile(props) {
  const renderSkills = () => {
    const skills = props.skills || [];
    return skills.map((skill, i) => <Skill key={i} title={skill} />);
  };

  const renderServices = () => {
    const services = props.services || [];
    return services.map((service, i) => (
      <BookableService key={i} withId={props.id} service={service} />
    ));
  };

  const renderReviews = () => {
    return props.reviews.map((review, i) => <Review key={i} review={review} />);
  };

  let currentRole;
  if (props.roles && props.roles.length > 0) {
    currentRole = props.roles[props.roles.length - 1];
  } else {
    currentRole = null;
  }

  const roles = props.roles || [];
  const educationExperiences = roles.filter(role => {
    return role.type === 'EDUCATION';
  });

  const workExperiences = roles.filter(role => {
    return role.type === 'WORK';
  });

  return (
    <div className="flex flex-col py-6 lg:flex-row justify-center align-center items-center lg:items-start">
      <div className="p-3 w-full lg:w-1/2 max-w-lg">
        <Card>
          <div className="flex flex-col xl:flex-row content-center justify-center items-center xl:items-start p-4 mb-6 pb-0">
            <UserIcon className="xl:mr-8" height={90} width={90} />
            <div className="flex flex-col justify-center">
              <p className="text-xl lg:text-3xl font-serif text-center xl:text-left text-black font-bold tracking-wide -mb-2">
                {`${props.firstName} ${props.lastName}`}
              </p>
              {currentRole && (
                <p className="lg:text-lg tracking-wide text-gray-700">
                  {`${currentRole.title}, ${currentRole.institution}`}
                </p>
              )}
              {props.reviewSummary && (
                <div className="my-3">
                  <FullRating {...props.reviewSummary} size={4} />
                </div>
              )}
            </div>
          </div>
          <div className="px-6">
            <ExperienceSection
              title={'Education'}
              experiences={educationExperiences}
            />
            <br className="my-6" />
            <ExperienceSection title={'Work'} experiences={workExperiences} />
          </div>
        </Card>
      </div>
      <div className="p-3 w-full l:w-1/2r max-w-lg lg:max-w-2xl">
        <Card>
          <SectionHeader title={'About'} />
          <p className="my-4 text-gray-700">{props.bio}</p>
          <div className="py-4">{renderSkills()}</div>
        </Card>
        <br />
        <Card>
          <SectionHeader title={'Start a Conversation'} />
          {props.services && (
            <div className="flex flex-col my-2">{renderServices()}</div>
          )}
        </Card>
        <br />
        <Card>
          <SectionHeader title={'Reviews'} />
          <div className="flex flex-col my-2">{renderReviews()}</div>
        </Card>
      </div>
    </div>
  );
}

export default ScoutProfile;
