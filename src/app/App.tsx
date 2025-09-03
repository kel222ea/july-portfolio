import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Page, PageGroup } from '@patternfly/react-core';

import { AppRoutes } from './AppRoutes';
import '@patternfly/react-core/dist/styles/base.css';

const App: React.FunctionComponent = () => {




  



  return (
    <Router basename="/july-portfolio">
      <Page>
        <PageGroup>
          <AppRoutes />
        </PageGroup>
      </Page>
    </Router>
  );
};

export default App;