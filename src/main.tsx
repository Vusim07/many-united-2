import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Failed to find root element');
} else {
  console.log('Root element found, mounting app...');
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}