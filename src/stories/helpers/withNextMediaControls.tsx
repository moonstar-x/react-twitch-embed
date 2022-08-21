import React, { Fragment, useState } from 'react';

const withNextMediaControls = <P extends object>(
  Component: React.ComponentType<P>,
  propName: string,
  media: string[]
) => {
  return () => {
    const [index, setIndex] = useState<number>(0);
    const value = media[index];

    const props = {
      [propName]: value
    };

    const handlePrevious = () => {
      setIndex((index - 1 + media.length) % media.length);
    };

    const handleNext = () => {
      setIndex((index + 1) % media.length);
    };

    const style = {
      margin: '1rem',
      fontSize: '1.3em'
    };

    return (
      <Fragment>
        <Component {...props as P} />
        <div style={{ margin: '1rem 3rem' }}>
          <button style={style} onClick={handlePrevious}>Previous</button>
          <span style={style}>Current {propName}: {value}</span>
          <button style={style} onClick={handleNext}>Next</button>
        </div>
      </Fragment>
    );
  };
};

export default withNextMediaControls;
