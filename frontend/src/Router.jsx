import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import SignIn from './user/SignIn';
import SignUp from './user/SignUp';
import Home from './core/Home';
import Menu from './core/Menu';
import Dashboard from './user/Dashboard';
import { isAuthenticated } from './helpers';

const PrivateWrapper = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/signin" />;
};

function Router() {
  return (
    <BrowserRouter>
    <Menu />
        <Routes>
            <Route element={<PrivateWrapper />}>
              <Route path='/' exact element={<Home />} />
              <Route path='/dashboard' exact element={<Dashboard />} />
            </Route>
            <Route path='/signin' exact element={<SignIn />} />
            <Route path='/signup' exact element={<SignUp />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router