import React from 'react';
import { ReactComponent as UserIcon } from '../icons/user-6.svg';
import Card from './Card';
import ExperienceSection from './ExperienceSection';

function ScoutProfile(props) {
  return (
    <div className="flex flex-col w-full py-8 content-center justify-center items-center">
      <div className="w-2/3">
        <Card>
          <div className="flex content-center justify-center items-center">
            <UserIcon className="mr-12" height={100} width={100} />
            <div>
              <div className="text-5xl font-serif -mb-2 font-bold tracking-wide">{`${props.firstName} ${props.lastName}`}</div>
              <div className="text-xl tracking-wide text-gray-800">
                {`${props.role.title}, ${props.role.institution}`}
              </div>
            </div>
          </div>
          <hr className="my-6" />
          <ExperienceSection
            title={'Education'}
            experiences={props.experience.education}
          />
          <hr className="my-6" />
          <div>
            <div className="text-2xl font-serif -mb-2 font-bold tracking-wide">
              Experience
            </div>
            <div>YYY 2015 - today</div>
            <div>XXX 2011 - 2015</div>
          </div>
        </Card>
      </div>

      <h1>{`Scout Profile ${props.id}`}</h1>
    </div>
  );
}

export default ScoutProfile;
