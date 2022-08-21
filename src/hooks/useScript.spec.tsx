import { renderHook } from '@testing-library/react';
import useScript from './useScript';

const src = 'localhost';

describe('Hooks -> useScript', () => {
  const createElementSpy = jest.spyOn(document, 'createElement');

  beforeEach(() => {
    createElementSpy.mockClear();
  });

  it('should create a script element.', () => {
    renderHook(() => useScript(src));
    expect(createElementSpy).toHaveBeenCalledWith('script');
  });
});
