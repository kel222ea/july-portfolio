import * as React from 'react';
import { Nav, NavItem, NavList } from '@patternfly/react-core';
import { useLocation, useNavigate } from 'react-router-dom';

export const AppNavigation: React.FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onNavSelect = (
    _event: React.FormEvent<HTMLInputElement>,
    selectedItem: {
      itemId: string | number;
      to: string;
    }
  ) => {
    navigate(selectedItem.to);
  };

  const navItems = [
    {
      itemId: 'overview',
      title: 'Overview',
      to: '/'
    },
    {
      itemId: 'wizard-comparison',
      title: 'Wizard vs Modal',
      to: '/wizard-comparison'
    },
    {
      itemId: 'state-management',
      title: 'State Management',
      to: '/state-management'
    },
    {
      itemId: 'form-validation',
      title: 'Form Validation',
      to: '/form-validation'
    },
    {
      itemId: 'status-indicators',
      title: 'Status & Progress',
      to: '/status-indicators'
    },
    {
      itemId: 'data-tables',
      title: 'Data Tables',
      to: '/data-tables'
    }
  ];

  return (
    <Nav onSelect={onNavSelect} theme="dark">
      <NavList>
        {navItems.map((item) => (
          <NavItem
            key={item.itemId}
            itemId={item.itemId}
            to={item.to}
            isActive={location.pathname === item.to}
          >
            {item.title}
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );
};