import { useEffect } from 'react';

declare global {
  interface Window {
    VLibras?: {
      Widget: new (url: string) => unknown;
    };
  }
}

const VLIBRAS_SCRIPT_ID = 'vlibras-plugin-script';

export function VLibrasWidget() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initialize = () => {
      if (!window.VLibras) return;

      const alreadyInitialized = document.body.dataset.vlibrasInitialized === 'true';
      if (alreadyInitialized) return;

      // Official initialization entrypoint provided by VLibras.
      new window.VLibras.Widget('https://vlibras.gov.br/app');
      document.body.dataset.vlibrasInitialized = 'true';
    };

    const existingScript = document.getElementById(VLIBRAS_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      if (window.VLibras) {
        initialize();
      } else {
        existingScript.addEventListener('load', initialize, { once: true });
      }
      return;
    }

    const script = document.createElement('script');
    script.id = VLIBRAS_SCRIPT_ID;
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = initialize;
    document.body.appendChild(script);
  }, []);

  return (
    <div {...({ vw: 'true' } as any)} className="enabled">
      <div {...({ 'vw-access-button': 'true' } as any)} className="active"></div>
      <div {...({ 'vw-plugin-wrapper': 'true' } as any)}>
        <div className="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  );
}
