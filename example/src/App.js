import React, { Component } from 'react';
import { TwitchEmbed, TwitchPlayer } from 'react-twitch-embed';

class App extends Component {
  render() {
    return (
      <div>
        <TwitchEmbed channel="moonstar_x" />
        <TwitchPlayer channel="moonstar_x" />
      </div>
    );
  }
}

export default App;
