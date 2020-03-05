import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import ScoutProfile from './ScoutProfile';
import ScrollToTop from './ScrollToTop';

const FAKE_DATA = {
  id: '1',
  firstName: 'Ike',
  lastName: 'Ziemann',
  bio: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Maecenas quis erat sed neque convallis pellentesque sit 
      amet ut diam. Pellentesque metus urna, dictum non ante 
      tristique, pharetra laoreet ante. In eget turpis orci. Nam 
      id orci sodales, suscipit velit sit amet, vestibulum ipsum. 
      Sed et consequat massa. Praesent aliquet volutpat lacinia. 
      Ut interdum dictum ante a ornare. Vivamus interdum id est ut 
      feugiat.
    `,
  currentRole: {
    title: 'Sr. Consultant',
    institution: 'Deloitte',
    tenure: '2016 - present'
  },
  skills: ['Consulting Interviews', 'Management Consulting', 'Business'],
  reviewSummary: {
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
  },
  services: [
    {
      title: 'Consulting Industry Discussion',
      description: `
          I'll sit down with you for an hour and discuss my experience
          in the industry and answer any questions you might have. This 
          opportunity is only available to those local to Chicago as it's 
          much easier and more natural to do in-person.
        `,
      price: 'Buy Me a 🍺'
    },
    {
      title: 'Consulting Interview Prep',
      description: `
          I will spend an hour helping you prep for consulting interviews. I 
          can draw on my past experiences and give you tips on how to improve 
          your responses. We can either do this in-person on over video chat 
          depending on your preference.
        `,
      price: '$25'
    }
  ],
  reviews: [
    {
      name: 'Anne',
      rating: 4.0,
      description: `
          I grabbed a beer with Ike in Chicago. Speaking with him was great! He was
          super helpful, and I walked away with a better understanding of the consulting
          interview process.
        `
    }
  ]
};

const SCOUT_QUERY = gql`
  query Scout($id: ID!) {
    scout(id: $id) {
      id
      firstName: firstname
      lastName: lastname
      bio
      roles {
        title
        institution
        tenure
        type
      }
      skills
      reviewSummary: rating {
        rating
        count
      }
      services {
        id
        title
        description
        price
      }
      reviews {
        author {
          firstName: firstname
          lastName: firstname
        }
        rating
        subject {
          id
        }
        text
      }
    }
  }
`;

function ScoutProfileContainer() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(SCOUT_QUERY, {
    variables: { id: id }
  });
  if (loading) {
    console.log('loading...');
    return 'loading...';
  }
  if (error) {
    console.log(`error: ${error}`);
    return 'error';
  }

  console.log(data);

  return (
    <Fragment>
      <ScrollToTop />
      <ScoutProfile {...data.scout} />;
    </Fragment>
  );
}

export default ScoutProfileContainer;
