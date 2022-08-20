import { renderHook } from '@testing-library/react';
import usePrevious from './usePrevious';

describe('Hooks -> usePrevious', () => {
  it('should return the previous value set.', () => {
    const { result, rerender } = renderHook(() => usePrevious('my_value'));
    expect(result.current).toBeUndefined();
    rerender();
    expect(result.current).toBe('my_value');
  });
});
