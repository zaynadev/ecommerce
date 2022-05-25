import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './user/SignIn';
import SignUp from './user/SignUp';
import Home from './core/Home';
import Menu from './core/Menu';

function Router() {
  return (
    <BrowserRouter>
    <Menu />
        <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/signin' exact element={<SignIn />} />
            <Route path='/signup' exact element={<SignUp />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router