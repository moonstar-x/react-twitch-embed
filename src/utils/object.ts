export const objectCompareWithIgnoredKeys = (
  o1: Record<string, unknown>,
  o2: Record<string, unknown>,
  keysToIgnore: string[]
): boolean => {
  for (const key in o1) {
    const v1 = o1[key];
    const v2 = o2[key];

    if (v1 !== v2 && !keysToIgnore.includes(key)) {
      return true;
    }
  }

  return false;
};
