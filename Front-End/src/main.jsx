import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SignalRProvider } from '../src/components/Hub/Hub.jsx';

import App from './apps/App.jsx';
import './apps/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SignalRProvider>
      <App />
    </SignalRProvider>
  </StrictMode>
);
