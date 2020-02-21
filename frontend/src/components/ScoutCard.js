import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../icons/user-4.svg';
import Rating from './Rating';
import Card from './Card';

function ScoutCard(props) {
  const renderSkills = () => {
    return props.scout.skills.map((skill, i) => (
      <span
        key={i}
        className="inline-block bg-gray-200 rounded-full px-3 py-1 my-1 text-xs font-semibold text-gray-700 mr-2"
      >
        {skill}
      </span>
    ));
  };

  return (
    <div className="m-2 mb-5">
      <Link to={`/scouts/${props.scout.id}`}>
        <Card>
          <div className="flex items-center pb-4">
            <UserIcon
              className="w-12 h-12 rounded-full mr-4"
              alt={`Avatar of ${props.scout.firstName} ${props.scout.lastName}`}
            />
            <div>
              <div className="font-serif font-bold text-black text-xl">
                {`${props.scout.firstName} ${props.scout.lastName}`}
              </div>
              <div className="text-gray-700 text-sm -my-1">
                {`${props.scout.role.title}, ${props.scout.role.institution}`}
              </div>
            </div>
          </div>
          <div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-0 py-4">{renderSkills()}</div>
          <hr className="py-2" />
          <Rating {...props.scout.reviews} />
        </Card>
      </Link>
    </div>
  );
}

export default ScoutCard;
