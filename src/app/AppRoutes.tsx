import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Overview } from '../components/Overview';
import { WizardComparison } from '../components/WizardComparison';
import { StateManagementComparison } from '../components/StateManagementComparison';
import { FormValidationComparison } from '../components/FormValidationComparison';
import { StatusIndicatorsComparison } from '../components/StatusIndicatorsComparison';
import { DataTablesComparison } from '../components/DataTablesComparison';

export const AppRoutes: React.FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<Overview />} />
    <Route path="/wizard-comparison" element={<WizardComparison />} />
    <Route path="/state-management" element={<StateManagementComparison />} />
    <Route path="/form-validation" element={<FormValidationComparison />} />
    <Route path="/status-indicators" element={<StatusIndicatorsComparison />} />
    <Route path="/data-tables" element={<DataTablesComparison />} />
  </Routes>
);