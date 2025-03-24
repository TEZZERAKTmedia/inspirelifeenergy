import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Components/navbar';
import Home from './Pages/Home';
import GalleryManagement from './Pages/GalleryManager';
import Messaging from './Pages/Messaging/inAppMessaging';
import Email from './Pages/Email';
import Layout from './Pages/Layout';
import Orders from './Pages/Order/Orders';
import Events from './Pages/newEvents';
import Classes from './Pages/Classes/Classes';
import Discount from './Pages/Discounts/Discounts';
import SocialLinksManager from './Pages/Social/socialManager';
import ProductManagement from './Pages/productManager/Products';
import { ScannerProvider } from './context/scannerContext';
import AdminLoginForm from './Components/loginForm';
import { DiscountProvider } from './Pages/Discounts/discounts-context';
import {ProductsProvider} from './Pages/productManager/ProductsContext';
import Invoices from './Pages/Invoice/Invoice';

const AdminApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    const root = document.documentElement;
    if (storedDarkMode) {
      root.classList.add('dark-mode');
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove('dark-mode');
      root.setAttribute("data-theme", "light");
    }
  }, []);
  

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/auth/check-auth', {
          withCredentials: true,
        });
        if (response.data.role === 'admin') {
          setIsAuthenticated(true);
          setUserRole(response.data.role);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <AdminLoginForm onLoginSuccess={(role) => {
      setIsAuthenticated(true);
      setUserRole(role);
    }} />;
  }

  return (
    <ScannerProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryManagement />} />
          <Route path="/layout" element={<Layout />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/email" element={<Email />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/event-manager" element={<Events />} />
          <Route path="/social-manager" element={<SocialLinksManager />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route
            path="/product-manager"
            element={
              <ProductsProvider>
                <ProductManagement />
              </ProductsProvider>
            }
          />
          <Route
            path="/discount"
            element={
              <DiscountProvider>
                <Discount />
              </DiscountProvider>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ScannerProvider>
  );
};

export default AdminApp;
