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
      channel: 'moonstar_x',
      video: '285064366',
      collection: 'YfGvvNZI9RWlEQ'
    };
  }

  render() {
    const { channel, enabled, video, collection } = this.state;

    return (
      <div>
        <button onClick={() => this.setState({ enabled: !this.state.enabled})}>Enable/Disable</button>
        <button onClick={() => this.setState({ channel: channels[Math.floor(Math.random() * channels.length)] })}>Change channel</button>
        {
          enabled &&
            <TwitchEmbed video={video} collection={collection} channel={channel} withChat={false} />
        }
        <iframe src="https://player.twitch.tv/?autoplay=false&collection=YfGvvNZI9RWlEQ" frameBorder="0"
                allowFullScreen="true" scrolling="no" height="378" width="620"></iframe>
        <a href="https://www.twitch.tv/collections/YfGvvNZI9RWlEQ?tt_content=text_link&tt_medium=vod_embed"
           >Watch
          Test collection from moonstar_x on www.twitch.tv</a>
      </div>
    );
  }
}

export default App;
