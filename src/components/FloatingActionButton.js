
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FloatingActionButton = ({ to, children }) => {
  return (
    <FabWrapper
      as={Link}
      to={to}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </FabWrapper>
  );
};

const FabWrapper = styled(motion.div)`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.large};
  right: ${({ theme }) => theme.spacing.large};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  text-decoration: none;
  z-index: 1000;
`;

export default FloatingActionButton;
