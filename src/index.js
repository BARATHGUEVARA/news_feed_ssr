import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

const root = document.querySelector("#root");


// Hydrate mode for SSR to CSR transistion
if (root.hasChildNodes() === true) {
  ReactDOM.hydrate(
    <React.StrictMode>
      <App data={window.__PRELOADED_STATE__ || {}}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
} else {
  // render for client side rendering
  ReactDOM.render(
    <React.StrictMode>
      <App data={window.__PRELOADED_STATE__ || {}}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

serviceWorker.unregister();
