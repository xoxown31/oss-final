
import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaTachometerAlt, FaPlus, FaUsers, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <SidebarContainer>
      <Logo>Bookend</Logo>
      <Nav>
        <StyledNavLink to="/" end>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </StyledNavLink>
        <StyledNavLink to="/add-record">
          <FaPlus />
          <span>Add Record</span>
        </StyledNavLink>
        <StyledNavLink to="/community">
          <FaUsers />
          <span>Community</span>
        </StyledNavLink>
      </Nav>
      <LogoutButton onClick={handleLogout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </LogoutButton>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  width: 250px;
  height: 100vh;
  padding: ${({ theme }) => theme.spacing.large};
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  position: fixed;
  left: 0;
  top: 0;
`;

const Logo = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  flex-grow: 1;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray};
  font-weight: bold;
  transition: background-color 0.2s, color 0.2s;

  svg {
    font-size: 1.2rem;
  }

  &.active, &:hover {
    background-color: ${({ theme }) => theme.colors.primary}22;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray};
  background: transparent;
  width: 100%;
  
  svg {
    font-size: 1.2rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent}22;
    color: ${({ theme }) => theme.colors.accent};
  }
`;


export default Sidebar;
