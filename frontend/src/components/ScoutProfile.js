import React from 'react';
import { ReactComponent as UserIcon } from '../icons/user-6.svg';
import Card from './Card';

function ScoutProfile(props) {
  return (
    <div>
      <div className="m-8 flex content-center justify-center items-center">
        <UserIcon className="mr-12" height={80} width={80} />
        <span className="text-5xl font-serif font-bold tracking-wide">{`${props.firstName} ${props.lastName}`}</span>
      </div>

      <h1>{`Scout Profile ${props.id}`}</h1>
    </div>
  );
}

export default ScoutProfile;
