import React from 'react';
import { ReactComponent as UserIcon } from '../icons/user-4.svg';
import Card from './Card';
import ExperienceSection from './ExperienceSection';
import SectionHeader from './SectionHeader';
import FullRating from './FullRating';
import Skill from './Skill';
import Review from './Review';

function ScoutProfile(props) {
  const renderSkills = () => {
    return props.skills.map((skill, i) => <Skill key={i} title={skill} />);
  };

  const renderServices = () => {
    return props.services.map((service, i) => (
      <div key={i} className="py-3 flex flex-col">
        <div className="flex items-center justify-between pb-3">
          <p className="text-black font-medium">{service.title}</p>
          <div className="w-1/3 m:w-1/4 pl-2 ml-2">
            <a
              href="/"
              className="block text-center text-sm text-primary font-bold px-4 py-2 leading-none border-2 rounded border-primary hover:border-transparent hover:text-white hover:bg-primary mt-4 md:mt-2"
            >
              {service.price}
            </a>
          </div>
        </div>
        <p className="text-sm text-gray-700">{service.description}</p>
      </div>
    ));
  };

  const renderReviews = () => {
    return props.reviews.map((review, i) => <Review key={i} review={review} />);
  };

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
              <p className="lg:text-lg tracking-wide text-gray-700">
                {`${props.currentRole.title}, ${props.currentRole.institution}`}
              </p>
              <div className="my-3">
                <FullRating {...props.reviewSummary} size={4} />
              </div>
            </div>
          </div>
          <div className="px-6">
            <ExperienceSection
              title={'Education'}
              experiences={props.experience.education}
            />
            <br className="my-6" />
            <ExperienceSection
              title={'Work'}
              experiences={props.experience.work}
            />
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
          <div className="flex flex-col my-2">{renderServices()}</div>
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
