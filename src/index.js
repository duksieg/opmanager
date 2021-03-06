import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter, Routes,
  Route,
} from "react-router-dom";

import CreateOp from './routes/CreateOp'
import LoginOp from './routes/LoginOp'
import ManageOP from './routes/ManageOp'
import Gmap from './routes/Maptracert'
import Dashboard from './routes/Dashboard'
import Reporter from './routes/Reporter'
import Tracert from './routes/Tracert'
import PointDetail from './components/db/db_point_detail'
import DB_Gmap from './components/db/db_Gmap';

ReactDOM.render(
  <BrowserRouter basename='/opmanager'>
    <Routes>
      <Route path="/" element={<App />}/>
        <Route path="createop" element={<CreateOp />} />
        <Route path="loginop" element={<LoginOp />} />
        <Route path="manageop" element={<ManageOP />} />
        <Route path="tracert" element={<Tracert />} />
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="dashboard/pointdetail" element={<PointDetail/>}/>
        <Route path="dashboard/map" element={<DB_Gmap/>}/>
        <Route path="tracert/:opname" element={<Gmap />} />
        <Route path="reporter/:opname" element={<Reporter/>}/>
        
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)

