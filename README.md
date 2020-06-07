# react-twitch-embed

A Twitch embed wrapper for React.js.

[![npm version](https://img.shields.io/npm/v/react-twitch-embed.svg)](https://www.npmjs.com/package/react-twitch-embed)
[![npm downloads](https://badgen.net/npm/dt/react-twitch-embed)](https://www.npmjs.com/package/react-twitch-embed)
[![bundle size](https://badgen.net/bundlephobia/minzip/react-twitch-embed)](https://bundlephobia.com/result?p=react-twitch-embed)
[![github stars](https://badgen.net/github/stars/moonstar-x/react-twitch-embed)](https://github.com/moonstar-x/react-twitch-embed)
[![github issues](https://badgen.net/github/issues/moonstar-x/react-twitch-embed)](https://github.com/moonstar-x/react-twitch-embed/issues)

## A Quick Note

If your project is currently only using `TwitchChat` or `TwitchClip` you will need to update this package to the `>2.0.0` version and take into account
the `parent` prop required for these two components. If you haven't updated this package, these components **will stop working after the 10th June of 2020**.

Moreover, after the 10th of June 2020 deadline, all sites that implement these components will need to run in **HTTPS**. Unless Twitch releases an update
on this, this requirement will also apply for local environments. For more information, check out the [Twitch Dev Discussion thread regarding this change](https://discuss.dev.twitch.tv/t/twitch-embedded-player-migration-timeline-update/25588/14?u=moonstar_x).


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
* `parent` **\<Array\<String\>\>**: An array containing the domain URLs that will embed your site. (Default: `[]`)
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
* `theme` **\<Enum\>**: Theme of the chat emebed. Available values: `light` and `dark`. (Default: `light`)
* `parent` **\<Array\<String\>\>**: An array containing the domain URL of the site that is embedding Twitch and the domain URLs that will embed your site. **Required**.
* `migration` **\<Boolean\>**: Enable the migration settings for the embed so that any change that will be implemented to the Twitch embeds will not result in a failed embed. Changing this prop is not recommended. (Default: `true`)
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
* `parent` **\<Array\<String\>\>**: An array containing the domain URL of the site that is embedding Twitch and the domain URLs that will embed your site. **Required**.
* `migration` **\<Boolean\>**: Enable the migration settings for the embed so that any change that will be implemented to the Twitch embeds will not result in a failed embed. Changing this prop is not recommended. (Default: `true`)
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
* `hideControls` **\<Boolean\>**: Whether the player should hide the controls UI or not. Keyboard events will still be captured by the player embed (i.e: the spacebar will still pause the video). (Default: `false`)
* `parent` **\<Array\<String\>\>**: An array containing the domain URLs that will embed your site. (Default: `[]`)
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

* **Why are the `parent` props required for `TwitchChat` and `TwitchClip` and not for the other ones?**
> `TwitchChat` and `TwitchClip` are not interactive embeds, they're raw `iframes`. For the other components, the embed scripts will automatically
> inject the domain through which your site is being accessed as the embed parent, making this prop not required for these components.

* **My embeds don't work, they just show an error JSON body.**
> Make sure that the you're specifying the `parent` prop for `TwitchChat` and `TwitchClip` and that your site is running in **HTTPS**.

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
      <TwitchChat channel="moonstar_x" theme="dark" parent={['localhost']} />
      <TwitchClip clip="WealthyBumblingKimchiItsBoshyTime" parent={['localhost', 'mycoolsite.com']} />
      <TwitchPlayer video="333014765" parent={['mycoolsite.com']} />
    </div>
  );
}
```

## Author

This component bundle was made by [moonstar-x](https://github.com/moonstar-x).
