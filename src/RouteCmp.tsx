import { Logout } from '@mui/icons-material';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Edit } from './Edit';
import { GridCmp } from './GridCmp';
import { Login } from './Login';
import { NormLogin } from './NormLogin';
import { Registration } from './Registration';
import { UserContProvider } from './Usercontext';
import { Home } from './Home';
import UserLog from './UsersLog';
import Hc from './Hc';
import Register from './Register'
import EditProfile from './EditProfile';

export const RouteCmp = () => {
  return (
    <UserContProvider>
      <Router>
        <Routes>
          <Route index path="/" element={<NormLogin />} />
          {/* <Route index path="/registration" element={<Registration />} /> */}
          <Route path="/registration" element={<Register/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          {/* <Route path="/editProfile" element={<EditProfile/>} /> */}
          <Route path="/log" element={<UserLog />} />
          <Route path="/hc" element={<Hc />} />

        </Routes>
      </Router>
    </UserContProvider>
  )
}
