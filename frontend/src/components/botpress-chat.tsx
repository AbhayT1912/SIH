import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

declare global {
  interface Window {
    botpressWebChat: {
      init: (config: any) => void;
      sendEvent: (payload: { type: string; payload?: any }) => void;
    };
  }
}

export function BotpressChat() {
  const [isInitialized, setIsInitialized] = useState(false);

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

    // Wait for first script to load before adding the second
    script1.onload = () => {
      document.body.appendChild(script2);
    };

    // After second script loads, initialize with our custom config
    script2.onload = () => {
      if (window.botpressWebChat) {
        window.botpressWebChat.init({
          "composerPlaceholder": "Chat with FasalSaathi Bot...",
          "botConversationDescription": "Your Agricultural Assistant",
          "botId": "B1ALFTY4",
          "hostUrl": "https://cdn.botpress.cloud/webchat/v3.3",
          "messagingUrl": "https://messaging.botpress.cloud",
          "clientId": "B1ALFTY4",
          "containerWidth": "100%",
          "layoutWidth": "100%",
          "hideWidget": true,
          "disableAnimations": true,
          "lazySocket": true,
          "themeName": "prism",
          "frontendVersion": "v3.3",
          "showPoweredBy": false,
          "theme": "light",
          "themeColor": "#2563eb",
          "stylesheet": "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
          "enableTranscriptDownload": false,
          "showConversationsButton": false,
          "closeOnEscape": true,
          "showTimestamp": false
        });
        setIsInitialized(true);
      }
    };

    // Cleanup function
    return () => {
      if (document.body.contains(script1)) {
        document.body.removeChild(script1);
      }
      if (document.body.contains(script2)) {
        document.body.removeChild(script2);
      }
      const widget = document.getElementById('bp-widget-root');
      if (widget) {
        widget.remove();
      }
    };
  }, []);

  const toggleChat = () => {
    if (isInitialized) {
      window.botpressWebChat.sendEvent({ type: 'toggle' });
    }
  };
}