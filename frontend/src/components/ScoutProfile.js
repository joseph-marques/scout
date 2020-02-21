import React from 'react';
import { ReactComponent as UserIcon } from '../icons/user-6.svg';
import Card from './Card';
import ExperienceSection from './ExperienceSection';

function ScoutProfile(props) {
  return (
    <div className="flex flex-col w-full py-8 content-center justify-center items-center">
      <div className="w-10/12">
        <Card>
          <div className="flex content-center justify-center items-center mt-4 mb-12">
            <UserIcon className="mr-12" height={90} width={90} />
            <div>
              <div className="text-3xl font-serif -mb-2 font-bold tracking-wide">{`${props.firstName} ${props.lastName}`}</div>
              <div className="text-lg tracking-wide text-gray-800">
                {`${props.role.title}, ${props.role.institution}`}
              </div>
            </div>
          </div>
          <div className="px-24">
            <ExperienceSection
              title={'Education'}
              experiences={props.experience.education}
            />
            <hr className="my-6" />
            <ExperienceSection
              title={'Work'}
              experiences={props.experience.work}
            />
          </div>
        </Card>
      </div>

      <h1>{`Scout Profile ${props.id}`}</h1>
    </div>
  );
}

export default ScoutProfile;
