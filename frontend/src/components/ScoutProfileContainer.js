import React from 'react';
import { useParams } from 'react-router-dom';
import ScoutProfile from './ScoutProfile';

function ScoutProfileContainer() {
  const { id } = useParams();
  const data = {
    id,
    firstName: 'Ike',
    lastName: 'Ziemann',
    role: {
      title: 'Sr. Consultant',
      institution: 'Deloitte'
    },
    skills: ['Consulting Interviews', 'Business', 'Management Consulting'],
    reviews: {
      rating: 3.8,
      count: 48
    }
  };

  return <ScoutProfile {...data} />;
}

export default ScoutProfileContainer;
