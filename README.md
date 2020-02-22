# react-twitch-embed

A Twitch embed wrapper for React.js.

[![npm version](https://img.shields.io/npm/v/react-twitch-embed.svg)](https://www.npmjs.com/package/react-twitch-embed)
[![npm downloads](https://badgen.net/npm/dt/react-twitch-embed)](https://www.npmjs.com/package/react-twitch-embed)
[![bundle size](https://badgen.net/bundlephobia/minzip/react-twitch-embed)](https://bundlephobia.com/result?p=react-twitch-embed)
[![github stars](https://badgen.net/github/stars/moonstar-x/react-twitch-embed)](https://github.com/moonstar-x/react-twitch-embed)
[![github issues](https://badgen.net/github/issues/moonstar-x/react-twitch-embed)](https://github.com/moonstar-x/react-twitch-embed/issues)

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

* `id` **\<String\>**: ID of the `div` node to mount the embedded player. Specify this if you need to show multiple players on the same page. (Default: `twitch-embed`)
* `allowFullscreen` **\<Boolean\>**: Allow player to go fullscreen. (Default: `true`)
* `channel` **\<String\>**: Channel name to stream. **Required**.
* `fontSize` **\<Enum\>**: Size of player font. Available values: `small`, `medium` and `large`. (Default: `small`)
* `height` **\<Number | String\>**: Player embed height in pixels. Allows strings formatted as percentage (i.e `'50%'`). (Default: `480`)
* `withChat` **\<Boolean\>**: Show stream chat in embed. (Default: `true`) 
* `theme` **\<Enum\>**: Player embed theme. Available values: `light` and `dark`. (Default: `light`) 
* `width` **\<Number | String\>**: Player embed width in pixels. Allows strings formatted as percentage (i.e `'50%'`). (Default: `940`) 
* `autoplay` **\<Boolean\>**: Make player autoplay media once ready. (Default: `true`)
* `muted` **\<Boolean\>**: Initialize player with the volume set to `0`. (Default: `false`)
* `onAuthenticate` **\<Func\>**: User authenticated event handler. (Default: `() => null`)
* `onVideoPlay` **\<Func\>**: Video play event handler. Receives an object with a `sessionId` property. (Default: `() => null`)
* `onVideoPause` **\<Func\>**: Video pause event handler. (Default: `() => null`)
* `onVideoReady` **\<Func\>**: Player ready event handler. Receives the player object. For more information on the available methods for the player object,
check out the [Twitch Video & Clips Documentation](https://dev.twitch.tv/docs/embed/video-and-clips#interactive-frames-for-live-streams-and-vods) (Default: `() => null`)

### TwitchChat

* `channel` **\<String\>**: Channel name to embed the chat. **Required**.
* `id` **\<String\>**: ID of the `iframe` node where the chat embed is mounted. Specify this if you have multiple chat embeds on the same page. (Default: `twitch-chat-embed`)
* `height` **\<Number\>**: Height of the chat embed in pixels. (Default: `500`)
* `width` **\<Number\>**: Width of the chat embed in pixels. (Default: `350`)
* `...props`: The `...props` object is supplied to chat embed `iframe` node.

### TwitchClip

* `clip` **\<String\>**: ID of the clip to showcase. **Required.**
* `id` **\<String\>**: ID of the `iframe` node where the clip embed is mounted. Specify this if you have multiple clip embeds on the same page. (Default: `twitch-clip-embed`)
* `autoplay` **\<Boolean\>**: Whether the clip starts playing once the player is ready. (Default: `true`)
* `muted` **\<Boolean\>**: Start the clip with the volume set to `0`. **Note:** By default, the clip player will be muted if the user hasn't
clicked on it yet. (Default: `false`)
* `height` **\<Number\>**: Height of the clip embed in pixels. (Default: `480`)
* `width` **\<Number\>**: Width of the clip embed in pixels. (Default: `940`)
* `allowFullscreen` **\<Boolean\>**: Allow the player to go on fullscreen mode. (Default: `true`)
* `...props`: The `...props` object is supplied to the clip embed `iframe` node.

## Example usage

```jsx
import React from 'react';
import { TwitchEmbed, TwitchChat, TwitchClip } from 'react-twitch-embed';

const Stream = () => {
  return (
    <div>
      <TwitchEmbed
        channel="moonstar_x"
        id="moonstar_x"
        theme="dark"
        muted
        onVideoPause={() => console.log(':(')}
      />
      <TwitchChat className="chat-embed-boder" channel="moonstar_x" />
      <TwitchClip clip="WealthyBumblingKimchiItsBoshyTime" />
    </div>
  );
}
```

## License

MIT © [moonstar-x](https://github.com/moonstar-x)
