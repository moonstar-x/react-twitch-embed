import React from 'react';
import { render, screen } from '@testing-library/react';
import Example from './Example';

describe('Components -> Example', () => {
  describe('with `text` prop:', () => {
    it('should display the text.', () => {
      render(<Example text="hello" />);
      expect(screen.getByText(/hello/)).toBeInTheDocument();
    });
  });
});
