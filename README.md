# react-twitch-embed

A Twitch embed wrapper for React.js.

[![NPM](https://img.shields.io/npm/v/react-twitch-embed.svg)](https://www.npmjs.com/package/react-twitch-embed)

## Install

```bash
npm install --save react-twitch-embed
```

or

```bash
yarn add react-twitch-embed
```

## Available props

### TwitchEmbed

> `id` **\<String\>**: ID of the div node to mount the embedded player. Specify this if you need to show multiple players on the same page. (Default: `twitch-embed`)
> 
> `allowFullscreen` **\<Boolean\>**: Allow player to go fullscreen. (Default: `true`)
> 
> `channel` **\<String\>**: Channel name to stream. **Required**.
> 
> `fontSize` **\<Enum\>**: Size of player font. Available values: `small`, `medium` and `large`. (Default: `small`)
>
> `height` **\<Number | String\>**: Player embed height in pixels. Allows strings formatted as percentage (i.e `'50%'`). (Default: `480`)
> 
> `withChat` **\<Boolean\>**: Show stream chat in embed. (Default: `true`)
> 
> `theme` **\<Enum\>**: Player embed theme. Available values: `light` and `dark`. (Default: `light`)
> 
> `width` **\<Number | String\>**: Player embed width in pixels. Allows strings formatted as percentage (i.e `'50%'`). (Default: `940`)
> 
> `autoplay` **\<Boolean\>**: Make player autoplay media once ready. (Default: `true`)
> 
> `muted` **\<Boolean\>**: Initialize player with the volume set to `0`. (Default: `false`)
> 
> `onAuthenticate` **\<Func\>**: User authenticated event handler. (Default: `() => null`)
> 
> `onVideoPlay` **\<Func\>**: Video play event handler. Receives an object with a `sessionId` property. (Default: `() => null`)
> 
> `onVideoPause` **\<Func\>**: Video pause event handler. (Default: `() => null`)
> 
> `onVideoReady` **\<Func\>**: Player ready event handler. Receives the player object. For more information on the available methods for the player object,
> check out the [Twitch Video & Clips Documentation](https://dev.twitch.tv/docs/embed/video-and-clips#interactive-frames-for-live-streams-and-vods) (Default: `() => null`)


## Example usage

```jsx
import React from 'react';
import TwitchEmbed from 'react-twitch-embed';

const Stream = () => {
  return (
    <TwitchEmbed
      channel="moonstar_x"
      id="moonstar_x"
      theme="dark"
      muted
      onVideoPause={() => console.log(':(')}
    />
  );
}
```

## License

MIT © [moonstar-x](https://github.com/moonstar-x)
