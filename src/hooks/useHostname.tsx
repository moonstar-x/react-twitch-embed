import { useState, useEffect } from 'react';

const usePrevious = (): string | undefined => {
  const [hostname, setHostname] = useState<string>();

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);

  return hostname;
};

export default usePrevious;
