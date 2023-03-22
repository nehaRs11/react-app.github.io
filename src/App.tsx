import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './Login';
import { Registration } from './Registration';
import { Home } from './Home';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { RouteCmp } from './RouteCmp';
import { GridCmp } from './GridCmp';
import { Provider } from 'react-redux';
import Register from './Register';

function App() {
  return (
    <div className="App">
        <RouteCmp />
        {/* <Register></Register> */}
        {/* <Registration></Registration> */}
        {/* <GridCmp/> */}
        {/* <Login></Login> */}
        {/* <Welcome></Welcome> */}
    </div>
  );
}

export default App;
