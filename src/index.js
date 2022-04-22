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
  <BrowserRouter>
    <Routes>
      <Route path="opmanager/" element={<App />}/>
        <Route path="opmanager/createop" element={<CreateOp />} />
        <Route path="opmanager/loginop" element={<LoginOp />} />
        <Route path="opmanager/manageop" element={<ManageOP />} />
        <Route path="opmanager/tracert" element={<Tracert />} />
        <Route path="opmanager/tracert/:opname" element={<Gmap />} />
        
    </Routes>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

