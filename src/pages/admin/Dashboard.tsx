import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Home from './Home';
import CHWManagement from './CHWManagement';
import SystemSettings from './SystemSettings';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chw-management" element={<CHWManagement />} />
        <Route path="/settings" element={<SystemSettings />} />
      </Routes>
    </AdminLayout>
  );
}