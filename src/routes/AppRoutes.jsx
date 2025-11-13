import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import UserForm from '../pages/UserForm';
import UserDetail from '../pages/UserDetail';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<UserForm />} />
      <Route path="/edit/:id" element={<UserForm />} />
      <Route path="/users/:id" element={<UserDetail />} />
    </Routes>
  );
}