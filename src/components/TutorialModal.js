
import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTachometerAlt, FaPlus, FaUsers, FaChartLine } from 'react-icons/fa';

const TutorialModal = ({ show, onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContainer
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <Header>Welcome to Bookend!</Header>
            <Description>Here’s a quick guide to get you started:</Description>
            <FeaturesList>
              <Feature>
                <FaTachometerAlt />
                <div>
                  <h4>Your Dashboard</h4>
                  <p>Track your reading stats and see your latest records at a glance.</p>
                </div>
              </Feature>
              <Feature>
                <FaPlus />
                <div>
                  <h4>Add Records</h4>
                  <p>Search for books you've read and add your ratings and thoughts.</p>
                </div>
              </Feature>
              <Feature>
                <FaUsers />
                <div>
                  <h4>Community Feed</h4>
                  <p>Share your records and discover what others in the community are reading.</p>
                </div>
              </Feature>
              <Feature>
                <FaChartLine />
                <div>
                  <h4>Rankings</h4>
                  <p>Check out which books are trending, most read, and top-rated by the community.</p>
                </div>
              </Feature>
            </FeaturesList>
            <CloseButton onClick={onClose}>Start Exploring</CloseButton>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.xlarge};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  width: 90%;
  max-width: 500px;
  text-align: center;
`;

const Header = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const FeaturesList = styled.ul`
  list-style: none;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};

  svg {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.secondary};
    flex-shrink: 0;
    width: 40px;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: bold;
  }
  
  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const CloseButton = styled.button`
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.xlarge};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export default TutorialModal;
