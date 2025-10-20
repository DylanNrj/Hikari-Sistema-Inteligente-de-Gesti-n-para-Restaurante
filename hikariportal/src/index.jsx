import React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { AppThemeProvider } from './components/Login/AppThemeProvider'; 

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <AppThemeProvider>
    <CssBaseline />
    <App />
  </AppThemeProvider>
);