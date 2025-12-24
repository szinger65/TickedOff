import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from './layout';
import Dashboard from './pages/dashboard';
import Tasks from './pages/tasks';
import Goals from './pages/goals';
import Progress from './pages/progress';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));

const LayoutWrapper = ({ children, pageName }) => (
  <Layout currentPageName={pageName}>
    {children}
  </Layout>
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route path="/dashboard" element={<LayoutWrapper pageName="Dashboard"><Dashboard /></LayoutWrapper>} />
          <Route path="/tasks" element={<LayoutWrapper pageName="Tasks"><Tasks /></LayoutWrapper>} />
          <Route path="/goals" element={<LayoutWrapper pageName="Goals"><Goals /></LayoutWrapper>} />
          <Route path="/progress" element={<LayoutWrapper pageName="Progress"><Progress /></LayoutWrapper>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);