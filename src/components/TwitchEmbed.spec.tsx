import React from 'react';
import { render, screen } from '@testing-library/react';
import TwitchEmbed from './TwitchEmbed';
import { TwitchWindow, TwitchPlayerInstance } from '../types';

const channel = 'channel';
const id = 'twitch-embed';

jest.mock('../hooks/useScript', () => jest.fn().mockReturnValue({ loading: false, error: null }));

const setChannelMock = jest.fn();
const setCollectionMock = jest.fn();
const setVideoMock = jest.fn();
(window as TwitchWindow).Twitch = {
// @ts-ignore
  Embed: jest.fn(() => {
    return {
      getPlayer: () => {
        return {
          setChannel: setChannelMock,
          setCollection: setCollectionMock,
          setVideo: setVideoMock
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

  it('should call setCollection when updating the collection prop.', () => {
    const { rerender } = render(<TwitchEmbed collection={channel} id={id} />);
    rerender(<TwitchEmbed collection="new_collection" id={id} />);
    expect(setCollectionMock).toHaveBeenCalledWith('new_collection', undefined);
  });

  it('should call setCollection when updating the collection and video prop.', () => {
    const { rerender } = render(<TwitchEmbed collection={channel} id={id} />);
    rerender(<TwitchEmbed collection="new_collection" video="new_video" id={id} />);
    expect(setCollectionMock).toHaveBeenCalledWith('new_collection', 'new_video');
  });

  it('should call setVideo when updating the video prop.', () => {
    const { rerender } = render(<TwitchEmbed video={channel} id={id} />);
    rerender(<TwitchEmbed video="new_video" id={id} />);
    expect(setVideoMock).toHaveBeenCalledWith('new_video', 0);
  });
});
