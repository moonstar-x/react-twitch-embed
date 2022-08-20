import { renderHook } from '@testing-library/react';
import useHostname from './useHostname';

const hostname = 'example.com';

global.window! = Object.create(window);
Object.defineProperty(window, 'location', {
  value: {
    hostname
  }
});

describe('Hooks -> useHostname', () => {
  it('should return the hostname.', () => {
    const { result } = renderHook(() => useHostname());
    expect(result.current).toBe(hostname);
  });
});
