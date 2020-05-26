import React, { Component } from 'react';
import { TwitchChat } from 'react-twitch-embed';

class App extends Component {
  render() {
    return (
      <div>
        <TwitchChat channel="moonstar_x" theme="dark" />
      </div>
    );
  }
}

export default App;
