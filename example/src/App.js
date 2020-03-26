import React, { Component } from 'react';
import { TwitchPlayer } from 'react-twitch-embed';

class App extends Component {
  render() {
    return (
      <div>
        <TwitchPlayer hideControls video="336710825" />
      </div>
    );
  }
}

export default App;
