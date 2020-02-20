import React from 'react';
import PropTypes from 'prop-types';

const TwitchEmbed = ({ text }) => {
  return (
    <div>
      {text}
    </div>
  );
};

TwitchEmbed.propTypes = {
  text: PropTypes.string.isRequired
};

export default TwitchEmbed;
