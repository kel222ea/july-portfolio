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
      itemId: 'additional-packages',
      title: 'Additional Packages',
      to: '/'
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