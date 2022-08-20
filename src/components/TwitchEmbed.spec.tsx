import React from 'react';
import { render, screen } from '@testing-library/react';
import TwitchEmbed from './TwitchEmbed';
import { TwitchWindow, TwitchPlayerInstance } from '../types';

const channel = 'channel';
const id = 'twitch-embed';

jest.mock('../hooks/useScript', () => jest.fn().mockReturnValue({ loading: false, error: null }));

const setChannelMock = jest.fn();
(window as TwitchWindow).Twitch = {
// @ts-ignore
  Embed: jest.fn(() => {
    return {
      getPlayer: () => {
        return {
          setChannel: setChannelMock
        };
      },
      addEventListener: jest.fn()
    };
  }) as unknown as TwitchPlayerInstance
};

describe('Components -> TwitchEmbed', () => {
  it('should render the parent div component.', async () => {
    render(<TwitchEmbed channel={channel} id={id} data-testid="twitch-embed" />);
    expect(await screen.getByTestId('twitch-embed')).toBeInTheDocument();
  });

  it('should call setChannel when updating the channel prop.', () => {
    const { rerender } = render(<TwitchEmbed channel={channel} id={id} />);
    rerender(<TwitchEmbed channel="new_channel" id={id} />);
    expect(setChannelMock).toHaveBeenCalledWith('new_channel');
  });
});
