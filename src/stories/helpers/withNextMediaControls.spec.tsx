import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import withNextMediaControls from './withNextMediaControls';

const MockComponent: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div>
      {text}
    </div>
  );
};
const propName = 'text';
const values = ['hi', 'hello', 'whats up'];

describe('Stories -> Helpers -> withNextMediaControls()', () => {
  const TestComponent = withNextMediaControls(MockComponent, propName, values);

  it('should render button controls.', () => {
    render(<TestComponent />);
    expect(screen.getByText(/Previous/)).toBeInTheDocument();
    expect(screen.getByText(/Next/)).toBeInTheDocument();
  });

  it('should render current value.', () => {
    render(<TestComponent />);
    expect(screen.getByText(/^hi$/)).toBeInTheDocument();
  });

  it('should update to the next and previous values when Next and Previous buttons are clicked.', () => {
    render(<TestComponent />);
    const nextButton = screen.getByText(/Next/);
    const previousButton = screen.getByText(/Previous/);

    fireEvent.click(nextButton);
    expect(screen.getByText(/^hello$/)).toBeInTheDocument();

    fireEvent.click(previousButton);
    expect(screen.getByText(/^hi$/)).toBeInTheDocument();
  });

  it('should update to the last value when Previous button is clicked and the current value is the first one.', () => {
    render(<TestComponent />);
    const previousButton = screen.getByText(/Previous/);
    fireEvent.click(previousButton);
    expect(screen.getByText(/^whats up$/)).toBeInTheDocument();
  });

  it('should update to the first value when Next button is clicked and the current value is the last one.', () => {
    render(<TestComponent />);
    const nextButton = screen.getByText(/Next/);

    for (let i = 0; i < values.length; i++) {
      fireEvent.click(nextButton);
    }

    expect(screen.getByText(/^hi$/)).toBeInTheDocument();
  });
});
