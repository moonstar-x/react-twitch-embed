import React, { Component } from 'react';
import { TwitchEmbed } from 'react-twitch-embed';

class App extends Component {
  render() {
    return (
      <div>
        <TwitchEmbed channel="moonstar_x" />
      </div>
    );
  }
}

export default App;
