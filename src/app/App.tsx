import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Page, PageHeader, PageSidebar, PageSidebarBody } from '@patternfly/react-core';
import { AppNavigation } from './AppNavigation';
import { AppRoutes } from './AppRoutes';
import '@patternfly/react-core/dist/styles/base.css';

const App: React.FunctionComponent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const onSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const Header = (
    <PageHeader
      logo="Image Builder Comparison Portfolio"
      showNavToggle
      isNavOpen={isSidebarOpen}
      onNavToggle={onSidebarToggle}
    />
  );

  const Sidebar = (
    <PageSidebar isNavOpen={isSidebarOpen}>
      <PageSidebarBody>
        <AppNavigation />
      </PageSidebarBody>
    </PageSidebar>
  );

  return (
    <Router>
      <Page header={Header} sidebar={Sidebar} isManagedSidebar>
        <AppRoutes />
      </Page>
    </Router>
  );
};

export default App;