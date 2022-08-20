import TwitchChat, { TwitchChatProps } from './components/TwitchChat';
import TwitchClip, { TwitchClipProps } from './components/TwitchClip';
import TwitchEmbed, { TwitchEmbedProps } from './components/TwitchEmbed';

import useScript, { ScriptState } from './hooks/useScript';
import usePrevious from './hooks/usePrevious';

import {
  TwitchWindow,
  TwitchEmbedConstructor,
  TwitchEmbedConstructorOptions,
  TwitchEmbedInstance,
  TwitchPlayerInstance
} from './types';

export {
  TwitchChat,
  TwitchChatProps,
  TwitchClip,
  TwitchClipProps,
  TwitchEmbed,
  TwitchEmbedProps,

  useScript,
  ScriptState,
  usePrevious,

  TwitchWindow,
  TwitchEmbedConstructor,
  TwitchEmbedConstructorOptions,
  TwitchEmbedInstance,
  TwitchPlayerInstance
};
