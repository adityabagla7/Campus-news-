import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DarkModeContextProvider } from "./context/darkModeContext";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/authContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
reportWebVitals();
