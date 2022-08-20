import TwitchChat, { TwitchChatProps } from './components/TwitchChat';
import TwitchClip, { TwitchClipProps } from './components/TwitchClip';
import TwitchEmbed, { TwitchEmbedProps } from './components/TwitchEmbed';
import TwitchPlayer, { TwitchPlayerProps } from './components/TwitchPlayer';
import TwitchPlayerNonInteractive, { TwitchPlayerNonInteractiveProps } from './components/TwitchPlayerNonInteractive';

import useScript, { ScriptState } from './hooks/useScript';
import usePrevious from './hooks/usePrevious';
import useHostname from './hooks/useHostname';

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
  TwitchPlayer,
  TwitchPlayerProps,
  TwitchPlayerNonInteractive,
  TwitchPlayerNonInteractiveProps,

  useScript,
  ScriptState,
  usePrevious,
  useHostname,

  TwitchWindow,
  TwitchEmbedConstructor,
  TwitchEmbedConstructorOptions,
  TwitchEmbedInstance,
  TwitchPlayerInstance
};
