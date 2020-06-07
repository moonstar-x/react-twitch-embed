import React, { Component } from 'react';
import { TwitchClip, TwitchChat } from 'react-twitch-embed';

class App extends Component {
  render() {
    return (
      <div>
        <TwitchClip clip="WealthyBumblingKimchiItsBoshyTime" parent={['localhost']} />
        <TwitchChat channel="moonstar_x" parent={['localhost']} />
      </div>
    );
  }
}

export default App;
