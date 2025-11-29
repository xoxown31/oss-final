
import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayout = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <Content>
        <Outlet />
      </Content>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.main`
  flex-grow: 1;
  margin-left: 250px; /* Same as Sidebar width */
  padding: ${({ theme }) => theme.spacing.large};
  min-height: 100vh;
`;

export default AppLayout;
