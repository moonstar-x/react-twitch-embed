import React from 'react';
import { TwitchEmbed, TwitchPlayer, TwitchChat, TwitchClip } from 'react-twitch-embed';

const Home = () => {
  return (
    <div>
      HELLO!
      <TwitchPlayer channel="moonstar_x" />
      <TwitchEmbed channel="moonstar_x" />
      <TwitchClip clip="WealthyBumblingKimchiItsBoshyTime" />
      <TwitchChat channel="moonstar_x" parent={['mycoolsite.com']} />
      <TwitchChat theme="dark" channel="moonstar_x" />
    </div>
  );
};

export default Home;
