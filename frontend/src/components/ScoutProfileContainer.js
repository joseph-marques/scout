import React from 'react';
import { useParams } from 'react-router-dom';
import ScoutProfile from './ScoutProfile';

function ScoutProfileContainer() {
  const { id } = useParams();
  const data = {
    id,
    firstName: 'Ike',
    lastName: 'Ziemann',
    currentRole: {
      title: 'Sr. Consultant',
      institution: 'Deloitte',
      tenure: '2016 - present'
    },
    skills: ['Consulting Interviews', 'Business', 'Management Consulting'],
    reviews: {
      rating: 3.8,
      count: 48
    },
    experience: {
      education: [
        {
          title: 'BSC in Economics',
          institution: 'University of Chicago',
          tenure: '2016 - 2018'
        },
        {
          title: 'BSC in Statistics',
          institution: 'University of Chicago',
          tenure: '2012 - 2014'
        }
      ],
      work: [
        {
          title: 'Sr. Consultant',
          institution: 'Deloitte',
          tenure: '2016 - present'
        },
        {
          title: 'Associate Consultant',
          institution: 'Pricewaterhouse Coopers',
          tenure: '2014 - 2016'
        }
      ]
    }
  };

  return <ScoutProfile {...data} />;
}

export default ScoutProfileContainer;
