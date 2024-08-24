import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n.tsx';
import App from './App.tsx';
// import App from './Dev.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
