import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import configureAppStore from './store';
import theme from './theme';
import './firebase';
import AuthHandler from "./components/AuthHandler";




ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureAppStore()}>
      <AuthHandler>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </AuthHandler>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

