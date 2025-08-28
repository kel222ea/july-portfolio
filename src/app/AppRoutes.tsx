import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdditionalPackages } from '../components/AdditionalPackages';

export const AppRoutes: React.FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<AdditionalPackages />} />
    <Route path="/additional-packages" element={<AdditionalPackages />} />
  </Routes>
);