import React, { Fragment, useRef } from 'react';
import { TwitchPlayerInstance, TwitchEmbedInstance } from '../../types';

const withVideoControls = <P extends object>(
  Component: React.ComponentType<P>,
  video: string
) => {
  return () => {
    const player = useRef<TwitchPlayerInstance>();

    const handlePlay = () => {
      player.current?.play();
    };

    const handlePause = () => {
      player.current?.pause();
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      player.current?.setVolume(parseFloat(e.currentTarget.value));
    };

    const handleReady = (obj: TwitchPlayerInstance | TwitchEmbedInstance) => {
      if ('getPlayer' in obj) {
        player.current = obj.getPlayer();
        return;
      }

      player.current = obj;
    };

    const props = {
      onReady: handleReady,
      video
    };

    const style = {
      margin: '1rem',
      fontSize: '1.3em'
    };

    return (
      <Fragment>
        <Component {...props as P} />
        <div style={{ margin: '1rem 3rem' }}>
          <div>
            <button style={style} onClick={handlePlay}>Play</button>
            <button style={style} onClick={handlePause}>Pause</button>
          </div>
          <div>
            <label htmlFor="volume-slider">Volume</label>
            <input
              type="range"
              defaultValue={0.5}
              min={0}
              max={1}
              step={0.05}
              onChange={handleVolumeChange}
              id="volume-slider"
            />
          </div>
        </div>
      </Fragment>
    );
  };
};

export default withVideoControls;
