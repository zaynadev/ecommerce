import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import SignIn from './user/SignIn';
import SignUp from './user/SignUp';
import Home from './core/Home';
import Menu from './core/Menu';
import Dashboard from './user/Dashboard';
import { currentUser, isAdmin, isAuthenticated } from './helpers';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';

const PrivateWrapper = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/signin" />;
};

const AdminWrapper = () => {
  const user = currentUser();
  return  user.role ? <Outlet /> : <Navigate to="/dashboard" />;
};

function Router() {
  return (
    <BrowserRouter>
    <Menu />
        <Routes>
            <Route element={<PrivateWrapper />}>
              <Route path='/' exact element={<Home />} />
              <Route path='/dashboard' exact element={isAdmin() ? <AdminDashboard /> : <Dashboard />} />
              <Route path='category' element={<AdminWrapper />}>
                <Route path='create' exact element={<AddCategory />} />
              </Route>
              <Route path='product' element={<AdminWrapper />}>
                <Route path='create' exact element={<AddProduct />} />
              </Route>
            </Route>
            <Route path='/signin' exact element={<SignIn />} />
            <Route path='/signup' exact element={<SignUp />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router