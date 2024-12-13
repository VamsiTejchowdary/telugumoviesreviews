import React from 'react';
import PropTypes from 'prop-types';

const CrewList = ({ crewDetails }) => {
  return (
    <div className="movie__crewListContainer">
      <div className="movie__crewList">
        {crewDetails.map((member, index) => (
          <div key={`${member.id}-${index}`} className="movie__crewMember">
            <img 
              src={
                member.profile_path 
                  ? `https://image.tmdb.org/t/p/w200${member.profile_path}` 
                  : '/default-image.png'
              } 
              alt={member.name}
              className="movie__crewImage"
              onError={(e) => { e.target.src = '/default-profile.png' }}
            />
            <div className="movie__crewName">{member.name}</div>
            <div className="movie__crewJob">{member.character}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

CrewList.propTypes = {
  crewDetails: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      job: PropTypes.string,
      profile_path: PropTypes.string
    })
  ).isRequired
};

export default CrewList;