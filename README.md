# react-twitch-embed

A Twitch embed wrapper for React.js.

[![npm version](https://img.shields.io/npm/v/react-twitch-embed.svg)](https://www.npmjs.com/package/react-twitch-embed)
[![npm downloads](https://badgen.net/npm/dt/react-twitch-embed)](https://www.npmjs.com/package/react-twitch-embed)
[![bundle size](https://badgen.net/bundlephobia/minzip/react-twitch-embed)](https://bundlephobia.com/result?p=react-twitch-embed)
[![github stars](https://badgen.net/github/stars/moonstar-x/react-twitch-embed)](https://github.com/moonstar-x/react-twitch-embed)
[![github issues](https://badgen.net/github/issues/moonstar-x/react-twitch-embed)](https://github.com/moonstar-x/react-twitch-embed/issues)

## Installation

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
* `...props`: The rest of the props are supplied to the `div` node where the `iframe` is mounted.

### TwitchChat

* `channel` **\<String\>**: Channel name to embed the chat. **Required**.
* `id` **\<String\>**: ID of the `iframe` node where the chat embed is mounted. Specify this if you have multiple chat embeds on the same page. (Default: `twitch-chat-embed`)
* `height` **\<Number | String\>**: Chat embed height in pixels. Allows strings formatted as percentage (i.e `'50%'`). (Default: `500`)
* `width` **\<Number | String\>**: Chat embed width in pixels. Allows strings formatted as percentage (i.e `'50%'`). (Default: `350`)
* `...props`: The rest of the props are supplied to chat embed `iframe` node.

### TwitchClip

* `clip` **\<String\>**: ID of the clip to showcase. **Required.**
* `id` **\<String\>**: ID of the `iframe` node where the clip embed is mounted. Specify this if you have multiple clip embeds on the same page. (Default: `twitch-clip-embed`)
* `autoplay` **\<Boolean\>**: Whether the clip starts playing once the player is ready. (Default: `true`)
* `muted` **\<Boolean\>**: Start the clip with the volume set to `0`. **Note:** By default, the clip player will be muted if the user hasn't
clicked on it yet. (Default: `false`)
* `height` **\<Number | String\>**: Clip embed height in pixels. Allows strings formatted as percentage (i.e `'50%'`). (Default: `480`)
* `width` **\<Number | String\>**: Clip embed width in pixels. Allows strings formatted as percentage (i.e `'50%'`). (Default: `940`)
* `allowFullscreen` **\<Boolean\>**: Allow the player to go on fullscreen mode. (Default: `true`)
* `...props`: The rest of the props are supplied to the clip embed `iframe` node.

### TwitchPlayer

* `id` **\<String\>**: ID of the `div` node where the player embed is mounted. Specify this if you want multiple player embeds on the same page. (Default: `twitch-player-embed`)
* `channel` **\<String\>**: Name of the channel to stream using the player. (Default: `null`)
* `collection` **\<String\>**: ID of the collection to play. (Default: `null`)
* `video` **\<String\>**: ID of the video or VOD to play. (Default: `null`)
* `height` **\<Number | String\>**: Player embed height in pixels. Allows strings formatted as percentage (i.e `'50%'`). (Default: `940`)
* `width` **\<Number | String\>**: Player embed width in pixels. Allows strings formatted as percentage (i.e `'50%'`). (Default: `480`)
* `playsInline` **\<Boolean\>**: Whether the embedded player plays inline for mobile iOS apps. (Default: `true`)
* `autoplay` **\<Boolean\>**: Whether the player starts playing once it's ready. (Default: `true`)
* `muted` **\<Boolean\>**: Whether the player starts muted. (Default: `false`)
* `allowFullscreen` **\<Boolean\>**: Allow the player to go on fullscreen mode. (Default: `true`)
* `time` **\<String\>**: Time in the video where playback starts. Needs to be formatted like: `1h2m3s`. (Default: `0h0m0s`)
* `onEnded` **\<Func\>**: Video or stream ended event handler. (Default: `() => null`)
* `onPause` **\<Func\>**: Player is paused event handler. (Default: `() => null`)
* `onPlay` **\<Func\>**: Player just unpaused event handler. (Default: `() => null`)
* `onPlaybackBlocked` **\<Func\>**: Player playback was blocked event handler. Usually fired after an unmuted autoplay or unmuted programmatic call on `play()`. (Default: `() => null`)
* `onPlaying` **\<Func\>**: Player started video playback event handler. (Default: `() => null`)
* `onOffline` **\<Func\>**: Loaded channel goes offline event handler. (Default: `() => null`)
* `onOnline` **\<Func\>**: Loaded channel goes online event handler. (Default: `() => null`)
* `onReady` **\<Func\>**: Player ready event handler. Receives the player object. For more information on the available methods for the player object, 
check out the [Twitch Video & Clips Documentation](https://dev.twitch.tv/docs/embed/video-and-clips#interactive-frames-for-live-streams-and-vods) (Default: `() => null`)
* `...props`: The rest of the props are supplied to the `div` node where the `iframe` is mounted.

> **Note**: If `channel`, `collection` and `video` are supplied, only `channel` is taken into account.
> If `collection` and `video` are supplied, the player will play the videos in the collection starting from the video that was specified.
> If the collection doesn't contain the video, the player will remain black (despite the docs saying that collection will play regardless).

## FAQ

* **Which should I choose, `TwitchEmbed` or `TwitchPlayer`?**
> They're both very similar, however, if you need to embed a stream with its chat and don't plan on controlling the player object
> from outside, then `TwitchEmbed` should be fine. The key difference is that `TwitchPlayer` not only accepts VODs and collections,
> it also has access to a more complete player object. Also, switching channels in `TwitchPlayer` is more fluid because it uses the
> player API to switch the channel. This also happens on `TwitchEmbed` but only when `withChat` is set to `false`. If `withChat` is
> set to `true` o `TwitchEmbed` and the `channel` prop is updated, it will recreate the embed. Another key difference is that `TwitchEmbed`
> will download the Twitch Embed and Player scripts. When multiple Embeds are mounted in the same page, the Player script will be downloaded
> for each `TwitchEmbed` on the page. `TwitchPlayer` will only download it once.

* **Why is there `TwitchClip` and `TwitchPlayer`?**
> Twitch handles clips and VODs differently, this is also true for their embeds. `TwitchClip` will only work for clips whereas
> `TwitchPlayer` will work for VODs, collections and streams.

* **Why are there multiple `404` errors in my console?**
> Twitch is currently undergoing an API migration and the embeds still use the old API which is already deprecated. The embeds still
> work fine.

* **Why are my embeds sticking next to each other?**
> If you need multiple embeds of the same type on the same page, you need to supply an `id` prop to each one, otherwise the embeds
> will mount on the same node, making them stick to each other.

* **Is there a demo?**
> Not yet, once I get enough time, I'll make a demo page.

## Example usage

```jsx
import React from 'react';
import { TwitchEmbed, TwitchChat, TwitchClip, TwitchPlayer } from 'react-twitch-embed';

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
      <TwitchPlayer video="333014765" />
    </div>
  );
}
```

## Author

This component bundle was made by [moonstar-x](https://github.com/moonstar-x).
