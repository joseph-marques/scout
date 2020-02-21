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
    },
    experience: {
      education: ['Bsc in economics from XX', 'Bsc in statistics from XX'],
      work: ['YYY 2015 - today', 'XXX 2011 - 2015']
    }
  };

  return <ScoutProfile {...data} />;
}

export default ScoutProfileContainer;
