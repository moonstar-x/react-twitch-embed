import React, { Component } from 'react';
import { TwitchEmbed, TwitchChat, TwitchClip } from 'react-twitch-embed';

const channels = ['loltyler1', 'moonstar_x', 'method', 'Rainbow6'];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: true,
      channel: 'moonstar_x',
      video: '285064366',
      collection: 'YfGvvNZI9RWlEQ'
    };

    this.handleEnable = this.handleEnable.bind(this);
    this.handleChangeChannel = this.handleChangeChannel.bind(this);
  }

  handleEnable() {
    this.setState({
      enabled: !this.state.enabled
    });
  }

  handleChangeChannel() {
    this.setState({
      channel: channels[Math.floor(Math.random() * channels.length)]
    });
  }

  render() {
    const { channel, enabled, video, collection } = this.state;

    return (
      <div>
        <button onClick={this.handleEnable}>Enable/Disable</button>
        <button onClick={this.handleChangeChannel}>Change channel</button>
        {
          enabled &&
          <TwitchEmbed video={video} collection={collection} channel={channel} withChat={false} />
        }
        <TwitchChat channel={channel} style={{ padding: 50, background: 'black' }} />
        <TwitchClip clip="WealthyBumblingKimchiItsBoshyTime" />
      </div>
    );
  }
}

export default App;
