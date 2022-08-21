import { useEffect, useState } from 'react';

export interface ScriptState {
  loading: boolean
  error: Error | null
}

const useScript = (src: string) => {
  const [state, setState] = useState<ScriptState>({
    loading: true,
    error: null
  });

  useEffect(() => {
    if (!src) {
      setState({
        loading: false,
        error: new Error('No src provided to useScript.')
      });
      return;
    }

    let script: HTMLScriptElement | null = document.querySelector(`script[src="${src}"]`);

    if (script) {
      setState((state) => ({
        ...state,
        loading: script!.getAttribute('data-loading') === 'true'
      }));
    } else {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.type = 'text/javascript';
      script.setAttribute('data-loading', 'true');
      document.body.appendChild(script);

      script.addEventListener('load', () => {
        script?.setAttribute('data-loading', 'false');
      }, { once: true });

      script.addEventListener('error', () => {
        script?.setAttribute('data-loading', 'false');
      }, { once: true });
    }

    const setStateFromEvent = (event: Event) => {
      if (event.type === 'load') {
        setState({
          loading: false,
          error: null
        });
      } else if (event.type === 'error') {
        setState({
          loading: false,
          error: new Error(`There was an error loading the script for ${src}`)
        });
      }
    };

    script.addEventListener('load', setStateFromEvent);
    script.addEventListener('error', setStateFromEvent);

    return () => {
      script?.removeEventListener('load', setStateFromEvent);
      script?.removeEventListener('error', setStateFromEvent);
    };
  }, [src]);

  return state;
};

export default useScript;
