import React, { Component } from 'react';
import { TwitchClip, TwitchChat } from 'react-twitch-embed';

class App extends Component {
  render() {
    return (
      <div>
        <TwitchClip clip="WealthyBumblingKimchiItsBoshyTime" parent={['localhost', '127.0.0.1']} migration={false} />
        <TwitchChat channel="moonstar_x" parent={['localhost']} />
        <TwitchChat theme="dark" channel="moonstar_x" parent={['localhost']} />
      </div>
    );
  }
}

export default App;
