import React, { Component } from 'react';
import { TwitchEmbed, TwitchChat, TwitchClip, TwitchPlayer } from 'react-twitch-embed';

const channels = ['loltyler1', 'moonstar_x', 'method', 'Rainbow6'];
const collections = ['YfGvvNZI9RWlEQ', '7n-aaF6m9RVAVQ'];
const videos = ['260075663'];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: true,
      channel: channels[2],
      video: videos[0],
      collection: collections[1],
      width: 900,
      chat: false
    };

    this.handleEnable = this.handleEnable.bind(this);
    this.handleChangeChannel = this.handleChangeChannel.bind(this);
    this.handleCollectionChange = this.handleCollectionChange.bind(this);
    this.handleVideoChange = this.handleVideoChange.bind(this);
    this.handleAllChange = this.handleAllChange.bind(this);
    this.handleChangeChannelWidth = this.handleChangeChannelWidth.bind(this);
    this.handleChangeChat = this.handleChangeChat.bind(this);
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

  handleCollectionChange() {
    this.setState({
      collection: collections[Math.floor(Math.random() * collections.length)]
    });
  }

  handleVideoChange() {
    this.setState({
      video: videos[Math.floor(Math.random() * videos.length)]
    });
  }

  handleAllChange() {
    this.setState({
      channel: channels[Math.floor(Math.random() * channels.length)],
      collection: collections[Math.floor(Math.random() * collections.length)],
      video: videos[Math.floor(Math.random() * videos.length)]
    });
  }

  handleChangeChannelWidth() {
    this.setState({
      channel: channels[Math.floor(Math.random() * channels.length)],
      width: this.state.width === 900 ? 600 : 900
    });
  }

  handleChangeChat() {
    this.setState({
      chat: !this.state.chat
    });
  }

  render() {
    const { channel, enabled, video, collection, width, chat } = this.state;

    return (
      <div>
        {/*<button onClick={this.handleEnable}>Enable/Disable</button>*/}
        {/*<button onClick={this.handleChangeChannel}>Change channel</button>*/}
        {/*<button onClick={this.handleCollectionChange}>Change collection</button>*/}
        {/*<button onClick={this.handleVideoChange}>Change video</button>*/}
        {/*<button onClick={this.handleAllChange}>Change all</button>*/}
        {/*<button onClick={this.handleChangeChannelWidth}>Change channel and width</button>*/}
        {/*<button onClick={this.handleChangeChat}>Toggle chat</button>*/}
        {/*{*/}
        {/*  enabled &&*/}
        {/*  <TwitchEmbed channel={channel} autoplay={false} muted fontSize="large" theme="dark" withChat={chat} />*/}
        {/*}*/}
        {/*<TwitchChat channel={channel} style={{ padding: 50, background: 'black' }} />*/}
        {/*<TwitchClip clip="WealthyBumblingKimchiItsBoshyTime" />*/}
        {/*<TwitchPlayer width={width} collection={collection} video={video} />*/}
        {/*{*/}
        {/*  channels.map((channel) =>*/}
        {/*    <TwitchPlayer key={channel} id={channel} channel={channel} />*/}
        {/*  )*/}
        {/*}*/}
        <TwitchClip width="100%" height="99vh" clip="WealthyBumblingKimchiItsBoshyTime" />
      </div>
    );
  }
}

export default App;
