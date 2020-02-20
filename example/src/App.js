import React, { Component } from 'react';
import TwitchEmbed from 'react-twitch-embed';

class App extends Component {
  render() {
    return (
      <div>
        <TwitchEmbed text="hello" />
      </div>
    );
  }
}

export default App;
