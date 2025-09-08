import {BrowserRouter,Route,Routes} from 'react-router-dom'
import React from 'react'
import Register from './components/Register';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import './App.css';

const App = () => (
 
<BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/Register" element={<Register />} />
      <Route exact path="/Dashboard" element={<Dashboard />} />
  
    </Routes>
    
    </BrowserRouter>


)


export default App;
