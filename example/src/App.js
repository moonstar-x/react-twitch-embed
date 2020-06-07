import React, { Component } from 'react';
import { TwitchClip, TwitchChat, TwitchPlayer, TwitchEmbed } from 'react-twitch-embed';

class App extends Component {
  render() {
    return (
      <div>
        <TwitchPlayer channel="moonstar_x" />
        <TwitchEmbed channel="moonstar_x" />
        <TwitchClip clip="WealthyBumblingKimchiItsBoshyTime" parent={['localhost', '127.0.0.1']} migration={false} />
        <TwitchChat channel="moonstar_x" parent={['localhost']} />
        <TwitchChat theme="dark" channel="moonstar_x" parent={['localhost']} migration={false} />
      </div>
    );
  }
}

export default App;
