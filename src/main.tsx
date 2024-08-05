import React from 'react';
import ReactDOM from 'react-dom/client';
// NOTE: "uno.css" does not exist but it fixes [unocss] Entry module not found. Did you add `import 'uno.css'` in your main entry?
// error.
import 'uno.css';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
