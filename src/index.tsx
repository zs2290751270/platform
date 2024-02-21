import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@arco-design/web-react/dist/css/arco.css";
import Routers from "./route";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routers />
  </BrowserRouter>
);
