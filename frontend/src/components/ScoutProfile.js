import React from 'react';
import { ReactComponent as UserIcon } from '../icons/user-4.svg';
import Card from './Card';
import ExperienceSection from './ExperienceSection';
import SectionHeader from './SectionHeader';
import Rating from './Rating';

function ScoutProfile(props) {
  return (
    <div className="flex justify-center m-3">
      <div className="w-1/2 p-3 max-w-lg">
        <Card>
          <div className="flex content-center justify-center items-center p-4">
            <UserIcon className="mr-8" height={90} width={90} />
            <div className="flex flex-col justify-start">
              <p className="text-3xl font-serif text-black font-bold tracking-wide -mb-2">
                {`${props.firstName} ${props.lastName}`}
              </p>
              <p className="text-xl tracking-wide text-gray-800">
                {`${props.currentRole.title}, ${props.currentRole.institution}`}
              </p>
              <div className="my-3">
                <Rating {...props.reviews} />
              </div>
            </div>
          </div>
          <br />
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
          <SectionHeader title={'About Me'} />
          <p>{props.bio}</p>
        </Card>
        <br />
        <Card>
          <SectionHeader title={'Start a Conversation'} />
          three
        </Card>
      </div>
    </div>
  );
}

export default ScoutProfile;
