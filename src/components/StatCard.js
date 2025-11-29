
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StatCard = ({ icon, title, value }) => {
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <IconWrapper>{icon}</IconWrapper>
      <StatValue>{value}</StatValue>
      <StatTitle>{title}</StatTitle>
    </Card>
  );
};

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.large};
  text-align: center;
  flex: 1;
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const StatValue = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const StatTitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray};
`;

export default StatCard;
