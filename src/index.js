import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter, Routes,
  Route,
  Outlet
} from "react-router-dom";

import Navigation from './components/Navigation'
import CreateOp from './routes/CreateOp'
import LoginOp from './routes/LoginOp'
import ManageOP from './routes/ManageOp'
import Tracert from './routes/Tracert'
import Gmap from './routes/Maptracert'

ReactDOM.render(
  <BrowserRouter basename='/opmanager'>
    <Routes>
      <Route path="/" element={<App />}/>
        <Route path="createop" element={<CreateOp />} />
        <Route path="loginop" element={<LoginOp />} />
        <Route path="manageop" element={<ManageOP />} />
        <Route path="tracert" element={<Tracert />} />
        <Route path="tracert/:opname" element={<Gmap />} />
        
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

