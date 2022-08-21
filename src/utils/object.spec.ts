import { objectCompareWithIgnoredKeys } from './object';

describe('Utils -> object', () => {
  describe('objectCompareWithIgnoredKeys()', () => {
    it('should return true if properties other than ignored have changed.', () => {
      const o1 = { a: 1, b: 2, c: 3 };
      const o2 = { a: 1, b: 3, c: 2 };
      const keys = ['b'];
      const result = objectCompareWithIgnoredKeys(o1, o2, keys);

      expect(result).toBe(true);
    });

    it('should return false if no properties have changed.', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const keys = ['a'];
      const result = objectCompareWithIgnoredKeys(obj, obj, keys);

      expect(result).toBe(false);
    });

    it('should return false if only properties that are ignored have changed.', () => {
      const o1 = { a: 1, b: 2, c: 3 };
      const o2 = { a: 1, b: 3, c: 2 };
      const keys = ['b', 'c'];
      const result = objectCompareWithIgnoredKeys(o1, o2, keys);

      expect(result).toBe(false);
    });
  });
});
