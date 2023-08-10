import React from 'react';
import ReactDOM from 'react-dom/client';
import Routers from './routes';
import GlobalStyle from './styles/global';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalStyle/>
    <Routers />
  </>
);
