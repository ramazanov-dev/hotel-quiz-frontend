import React from 'react'

import {createRoot} from 'react-dom/client';
import App from './components/App';

import './styles/null.css'
import './styles/variables.css'
import './styles/index.css'
import {BrowserRouter} from "react-router-dom";

const rootNode = document.getElementById('root');
if (!rootNode) {
  throw new Error("No root element");
}

const root = createRoot(rootNode);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
