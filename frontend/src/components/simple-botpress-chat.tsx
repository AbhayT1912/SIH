import { useEffect } from 'react';

export function SimpleBotpressChat() {
  useEffect(() => {
    // Script 1: The main library
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v3.3/inject.js';
    script1.async = true;
    document.body.appendChild(script1);

    // Script 2: Your bot's specific configuration
    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2025/09/17/14/20250917144801-B1ALFTY4.js';
    script2.defer = true;
    document.body.appendChild(script2);

    return () => {
      // Clean up scripts on component unmount
      if (document.body.contains(script1)) {
        document.body.removeChild(script1);
      }
      if (document.body.contains(script2)) {
        document.body.removeChild(script2);
      }
    };
  }, []);

  return null; // This component renders nothing itself
}