import React from 'react';
import { ReactComponent as UserIcon } from '../icons/user-4.svg';
import Card from './Card';
import ExperienceSection from './ExperienceSection';
import SectionHeader from './SectionHeader';
import Rating from './Rating';
import Skill from './Skill';

function ScoutProfile(props) {
  const renderSkills = () => {
    return props.skills.map((skill, i) => <Skill key={i} title={skill} />);
  };

  const renderServices = () => {
    return props.services.map((service, i) => (
      <tr key={i} className="py-3">
        <td className="w-3/4 pr-4 py-2">
          <p className="text-black">{service.title}</p>
          <p className="text-xs text-gray-700">{service.description}</p>
        </td>
        <td className="w-1/4 py-2">
          <a
            href="#"
            className="block text-center text-sm text-primary font-bold px-4 py-2 leading-none border-2 rounded border-primary hover:border-transparent hover:text-white hover:bg-primary mt-4 md:mt-2"
          >
            {service.price}
          </a>
        </td>
      </tr>
    ));
  };

  const renderReviews = () => {};

  return (
    <div className="flex justify-center">
      <div className="w-1/2 p-3 max-w-lg">
        <Card>
          <div className="flex content-center justify-center items-center p-4 pb-0">
            <UserIcon className="mr-8" height={90} width={90} />
            <div className="flex flex-col justify-center">
              <p className="text-3xl font-serif text-black font-bold tracking-wide -mb-2">
                {`${props.firstName} ${props.lastName}`}
              </p>
              <p className="text-lg tracking-wide text-gray-700">
                {`${props.currentRole.title}, ${props.currentRole.institution}`}
              </p>
              <div className="my-3">
                <Rating {...props.reviewSummary} />
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
      <div className="w-1/2 p-3">
        <Card>
          <SectionHeader title={'About'} />
          <p className="my-4 text-gray-700">{props.bio}</p>
          <div className="py-4">{renderSkills()}</div>
        </Card>
        <br />
        <Card>
          <SectionHeader title={'Start a Conversation'} />
          <table className="table-fixed my-2">{renderServices()}</table>
        </Card>
        <br />
        <Card>
          <SectionHeader title={'Reviews'} />
          <div className="my-2">{renderReviews()}</div>
        </Card>
      </div>
    </div>
  );
}

export default ScoutProfile;
