import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import Layout from '../components/Dashboard/Layout'; 
import Dashboard from '../pages/Dashboard';
import CategoriesPage from '../pages/CategoriesPage';
import PaymentsPage from '../pages/PaymentsPage';
import ProductsPage from '../pages/ProductsPage';
import TablesPage from '../pages/TablesPage';
import Users from '../pages/UserPage';
import Orders from '../pages/OrdersPage';  

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/sign-up" element={<SignUpPage />} />
    <Route path="/" element={<Layout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="categories" element={<CategoriesPage />} />
      <Route path="payments" element={<PaymentsPage />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="tables" element={<TablesPage />} />
      <Route path="users" element={<Users />} /> 
      <Route path="orders/:tableId" element={<Orders />} />
    </Route>
  </Routes>
);

export default AppRoutes;