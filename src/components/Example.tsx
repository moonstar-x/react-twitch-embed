import React from 'react';

export interface ExampleProps {
  text: string
}

const Example: React.FC<ExampleProps> = ({ text }) => {
  return (
    <button>
      {text}
    </button>
  );
};

export default Example;
