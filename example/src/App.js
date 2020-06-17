import React, { Component } from 'react';
import { TwitchClip, TwitchChat, TwitchPlayer, TwitchEmbed } from 'react-twitch-embed';

class App extends Component {
  render() {
    return (
      <div>
        <TwitchPlayer channel="moonstar_x" />
        <TwitchEmbed channel="moonstar_x" />
        <TwitchClip clip="WealthyBumblingKimchiItsBoshyTime" />
        <TwitchChat channel="moonstar_x" parent={['mycoolsite.com']} />
        <TwitchChat theme="dark" channel="moonstar_x" />
      </div>
    );
  }
}

export default App;
