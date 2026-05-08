import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthProvider } from './contexts/Auth/AuthProvider';
import { SnackbarProvider } from './contexts/SnackbarContext';
import theme from './theme';
import './styles/globals.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Provider } from 'react-redux';
import { store } from './store';

import { NotificationProvider } from './contexts/NotificationContext';
import { CartProvider } from './contexts/CartContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <AuthProvider>
            <SnackbarProvider>
              <NotificationProvider>
                <CartProvider>
                  <RouterProvider router={router} />
                </CartProvider>
              </NotificationProvider>
            </SnackbarProvider>
          </AuthProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
