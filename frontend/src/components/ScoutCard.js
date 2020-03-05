import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../icons/user-4.svg';
import FullRating from './FullRating';
import Card from './Card';
import Skill from './Skill';

function ScoutCard(props) {
  const renderSkills = () => {
    const skills = props.scout.skills || [];
    return skills.map((skill, i) => <Skill key={i} title={skill} />);
  };

  let currentRole;
  if (props.scout.roles && props.scout.roles.length > 0) {
    currentRole = props.scout.roles[props.scout.roles.length - 1];
  } else {
    currentRole = null;
  }

  return (
    <div className="m-2 mb-5">
      <Link to={`/scouts/${props.scout.id}`}>
        <Card>
          <div className="flex items-center pb-4">
            <UserIcon
              className="w-12 h-12 rounded-full ml-2 mr-4"
              alt={`Avatar of ${props.scout.firstName} ${props.scout.lastName}`}
            />
            <div>
              <div className="font-serif font-bold text-black text-2xl">
                {`${props.scout.firstName} ${props.scout.lastName}`}
              </div>
              {currentRole && (
                <div className="text-gray-700 text-sm -my-1">
                  {`${currentRole.title}, ${currentRole.institution}`}
                </div>
              )}
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
          {props.scout.reviewSummary && (
            <Fragment>
              <hr className="py-2" />
              <FullRating {...props.scout.reviewSummary} />
            </Fragment>
          )}
        </Card>
      </Link>
    </div>
  );
}

export default ScoutCard;
