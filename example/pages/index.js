import React from 'react';
import { TwitchEmbed, TwitchPlayer } from 'react-twitch-embed';

const Home = () => {
  return (
    <div>
      HELLO!
      <TwitchEmbed channel="moonstar_x" />
      <TwitchEmbed channel="moonstar_x" />
      <TwitchPlayer channel="moonstar_x" />
      <TwitchPlayer channel="moonstar_x" />
    </div>
  );
};

export default Home;
