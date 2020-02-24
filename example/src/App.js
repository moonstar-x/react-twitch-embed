import React, { Component } from 'react';
import { TwitchPlayer } from 'react-twitch-embed';

const channels = ['loltyler1', 'moonstar_x', 'method', 'Rainbow6'];

class App extends Component {
  render() {
    return (
      <div>
        {
          channels.map((channel) =>
            <TwitchPlayer className="twitch-embed" width="50%" key={channel} id={channel} channel={channel} />
          )
        }
      </div>
    );
  }
}

export default App;
