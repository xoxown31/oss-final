import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';
  const registrationMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <LoginWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoginForm onSubmit={handleSubmit}>
        <Title>Bookend</Title>
        <Subtitle>Sign in to continue</Subtitle>
        {registrationMessage && <SuccessMessage>{registrationMessage}</SuccessMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
        <SignUpLink>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </SignUpLink>
      </LoginForm>
      <AnimatedShapes />
    </LoginWrapper>
  );
};

const LoginWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.xlarge};
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  width: 100%;
  max-width: 400px;
  text-align: center;
  z-index: 2;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.gray}33;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
  background-color: ${({ theme }) => theme.colors.background};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  font-size: 0.9rem;
`;

const SuccessMessage = styled.p`
  color: #28a745;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  font-size: 0.9rem;
  font-weight: bold;
`;

const SignUpLink = styled.p`
  margin-top: ${({ theme }) => theme.spacing.large};
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.9rem;

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const move = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
`;

const Shape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  opacity: 0.1;
  animation: ${move} 10s infinite ease-in-out;
`;

const AnimatedShapes = () => (
  <>
    <Shape color="#5D54A4" style={{ width: 200, height: 200, top: '10%', left: '15%' }} />
    <Shape color="#9D65C9" style={{ width: 150, height: 150, bottom: '20%', right: '20%', animationDelay: '3s' }} />
  </>
);

export default LoginPage;