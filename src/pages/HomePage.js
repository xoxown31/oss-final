
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Wrapper>
      <Content
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <Title>Welcome to Bookend</Title>
        <Subtitle>Discover your next favorite book, together.</Subtitle>
        <Description>
          Track your reading journey, share your thoughts with a vibrant community, and see what's trending in the world of literature.
        </Description>
        <CtaButton as={Link} to="/login">Get Started</CtaButton>
      </Content>
      <AnimatedShapes />
    </Wrapper>
  );
};

const move = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  position: relative;
`;

const Content = styled(motion.div)`
  text-align: center;
  z-index: 2;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const Description = styled.p`
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text}aa;
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const CtaButton = styled(motion.a)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.xlarge};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }
`;

// Simple decorative background shapes
const Shape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  opacity: 0.1;
  animation: ${move} 10s infinite ease-in-out;
`;

const AnimatedShapes = () => (
  <>
    <Shape color="#6C5B7B" style={{ width: 200, height: 200, top: '10%', left: '15%' }} />
    <Shape color="#C06C84" style={{ width: 150, height: 150, bottom: '20%', right: '20%', animationDelay: '3s' }} />
    <Shape color="#F67280" style={{ width: 100, height: 100, top: '25%', right: '10%', animationDelay: '6s' }} />
    <Shape color="#8884d8" style={{ width: 120, height: 120, bottom: '15%', left: '5%', animationDelay: '9s' }} />
  </>
);

export default HomePage;
