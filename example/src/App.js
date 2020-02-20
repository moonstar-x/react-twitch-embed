import React, { Component } from 'react';
import TwitchEmbed from 'react-twitch-embed';

const channels = ['loltyler1', 'moonstar_x', 'method', 'Rainbow6'];

const logArguments = (...args) => {
  console.log(args);
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: true,
      channel: 'loltyler1'
    };
  }

  render() {
    const { channel, enabled } = this.state;

    return (
      <div>
        <button onClick={() => this.setState({ enabled: !this.state.enabled})}>Enable/Disable</button>
        <button onClick={() => this.setState({ channel: channels[Math.floor(Math.random() * channels.length)] })}>Change channel</button>
        {
          enabled &&
            <TwitchEmbed channel={channel} onAuthenticate={logArguments} onVideoPlay={logArguments} onVideoReady={logArguments} onVideoPause={logArguments} />
        }
      </div>
    );
  }
}

export default App;
