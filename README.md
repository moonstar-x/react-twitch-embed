[![ci-build-status](https://img.shields.io/github/workflow/status/moonstar-x/react-twitch-embed/On%20Push%20%28Master%29?logo=github)](https://github.com/moonstar-x/react-twitch-embed)
[![issues](https://img.shields.io/github/issues/moonstar-x/react-twitch-embed?logo=github)](https://github.com/moonstar-x/react-twitch-embed)
[![bundle-size](https://img.shields.io/bundlephobia/min/react-twitch-embed)](https://www.npmjs.com/package/react-twitch-embed)
[![version](https://img.shields.io/npm/v/react-twitch-embed?logo=npm)](https://www.npmjs.com/package/react-twitch-embed)
[![downloads-week](https://img.shields.io/npm/dw/react-twitch-embed?logo=npm)](https://www.npmjs.com/package/react-twitch-embed)
[![downloads-total](https://img.shields.io/npm/dt/react-twitch-embed?logo=npm)](https://www.npmjs.com/package/react-twitch-embed)

# react-twitch-embed

A collection of components to embed Twitch.

For more information, visit the [Embedding Twitch](https://dev.twitch.tv/docs/embed) documentation page.

Make sure to check out the [Demo and Documentation](https://docs.moonstar-x.dev/react-twitch-embed) page for more information on the usage of the components,
alongside a description on all the supported props for each component.

## Installation

```text
npm install react-twitch-embed
```

## A Note on Typings

This package includes some typings for the `Embed` and `Player` constructors that are downloaded automatically
into the browser's `window` object. These are unofficial typings that I made empirically, some of them might not be accurate.

The documentation on Twitch's official page is incomplete in various aspects, and a lot of the functionality included
in this package was found by arbitrarily and through trial and error.

If you find any inconsistency with the typings provided by this package, feel free to open a
[Pull Request](https://github.com/moonstar-x/react-twitch-embed).

## A Note on the `parent` Prop

Twitch requires that any embeds include the URL of the parent site that embeds their content. These components will get this
parent URL through `window.location.hostname` for non-interactive components (those components that are essentially just an `iframe`),
while the interactive ones get the parent automatically (possible through the same property) by their respective constructor.

As such, you shouldn't need to specify this prop for any of the components, unless you run a particular setup with multiple domains.

## FAQ

* **Between `TwitchEmbed`, `TwitchPlayer` and `TwitchPlayerNonInteractive`, which component should I choose?**
> Out of these components, `TwitchEmbed` and `TwitchPlayer` are both interactive components, meaning that they expose the internal
> instance through their respective events. Both of these components support streams, VODs and collections, and they both react
> efficiently when their `channel`, `video`, or `collection` props change by using the internal API instead of recreating the embed
> when they change. The key difference is that `TwitchEmbed` can include the live chat on streams. At the end of the day, it depends
> on which one you prefer.
>
> As for `TwitchPlayerNonInteractive`, this component can embed streams, VODs and collections too, but it does not include an internal
> API. This means that channel, video or collection switching is not "smooth" and will recreate the embed. However, this component does
> not download anything extra, it does not create any additional nodes on the body document, so it is probably less resource heavy.

* **Why are there `TwitchClip` and `TwitchPlayer`?**
> `TwitchClip` will only work for clips whereas`TwitchPlayer` will work for VODs, collections and streams.

* **I'm using multiple embeds simultaneously, why are they sticking next to each other?**
> In the case of `TwichEmbed` and `TwitchPlayer`, these components need an `id` prop to work because the internal API
> mounts its respective `iframe` inside a `div` queried by its `id`. These components will use a default `id` if it's not
> provided in their props. If you're displaying multiple embeds simultaneously then you should provide a static `id`. Try
> not to use the name of the channel as an `id` because in the case that this prop changes, the embed will be recreated and
> the internal API won't be used for the channel switching.

* **What does smooth switching mean?**
> For the `TwitchEmbed` and `TwitchPlayer` components, when updating their `channel`, `video` and/or `collection` props,
> the player will not be recreated and instead the internal API will be used to update this data.

## Testing

You can run the tests for this package by running:

```text
npm test
```

Or leave the watcher running with:

```text
npm run test:watch
```

## Developing

When developing, you can use Storybook as a way to check the components and test them. You can run the Storybook server with:

```text
npm run storybook:serve
```

Also, make sure that your code is linter properly with:

```text
npm run lint
```

## Author

This component package was made by [moonstar-x](https://github.com/moonstar-x).
