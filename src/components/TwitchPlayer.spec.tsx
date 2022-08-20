import React from 'react';
import { render, screen } from '@testing-library/react';
import TwitchPlayer from './TwitchPlayer';
import { TwitchWindow, TwitchPlayerInstance } from '../types';

const channel = 'channel';
const id = 'twitch-embed';

jest.mock('../hooks/useScript', () => jest.fn().mockReturnValue({ loading: false, error: null }));

const setChannelMock = jest.fn();
const setCollectionMock = jest.fn();
const setVideoMock = jest.fn();
(window as TwitchWindow).Twitch = {
// @ts-ignore
  Player: jest.fn(() => {
    return {
      setChannel: setChannelMock,
      setCollection: setCollectionMock,
      setVideo: setVideoMock,
      addEventListener: jest.fn()
    };
  }) as unknown as TwitchPlayerInstance
};

describe('Components -> TwitchPlayer', () => {
  it('should render the parent div component.', async () => {
    render(<TwitchPlayer channel={channel} id={id} data-testid="twitch-embed" />);
    expect(await screen.getByTestId('twitch-embed')).toBeInTheDocument();
  });

  it('should call setChannel when updating the channel prop.', () => {
    const { rerender } = render(<TwitchPlayer channel={channel} id={id} />);
    rerender(<TwitchPlayer channel="new_channel" id={id} />);
    expect(setChannelMock).toHaveBeenCalledWith('new_channel');
  });

  it('should call setCollection when updating the collection prop.', () => {
    const { rerender } = render(<TwitchPlayer collection={channel} id={id} />);
    rerender(<TwitchPlayer collection="new_collection" id={id} />);
    expect(setCollectionMock).toHaveBeenCalledWith('new_collection');
  });

  it('should call setVideo when updating the video prop.', () => {
    const { rerender } = render(<TwitchPlayer video={channel} id={id} />);
    rerender(<TwitchPlayer video="new_video" id={id} />);
    expect(setVideoMock).toHaveBeenCalledWith('vnew_video');
  });
});
