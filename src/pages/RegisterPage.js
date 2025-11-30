import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { register } from '../api'; 
import theme from '../styles/theme';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (username.length < 4) {
      setError('Username must be at least 4 characters long.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    try {
      await register(username, password);
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    } catch (err) {
      setError('Username may already be taken. Please try another.');
    }
  };

  return (
    <RegisterWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <RegisterForm onSubmit={handleSubmit}>
        <Title>Create Account</Title>
        <Subtitle>Join the Bookend community</Subtitle>
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
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit">Sign Up</Button>
        <LoginLink>
          Already have an account? <Link to="/login">Log In</Link>
        </LoginLink>
      </RegisterForm>
      <AnimatedShapes />
    </RegisterWrapper>
  );
};

const RegisterWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${() => theme.colors.background};
  position: relative;
  overflow: hidden;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: ${() => theme.spacing.xlarge};
  background: ${() => theme.colors.card};
  border-radius: ${() => theme.borderRadius};
  box-shadow: ${() => theme.shadows.medium};
  width: 100%;
  max-width: 400px;
  text-align: center;
  z-index: 2;
`;

const Title = styled.h1`
  font-family: ${() => theme.fonts.heading};
  font-size: 2.5rem;
  color: ${() => theme.colors.primary};
  margin-bottom: ${() => theme.spacing.small};
`;

const Subtitle = styled.p`
  color: ${() => theme.colors.gray};
  margin-bottom: ${() => theme.spacing.large};
`;

const Input = styled.input`
  padding: ${() => theme.spacing.medium};
  margin-bottom: ${() => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.gray}33;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
  background-color: ${({ theme }) => theme.colors.background};

  &:focus {
    border-color: ${() => theme.colors.primary};
  }
`;

const Button = styled.button`
  padding: ${() => theme.spacing.medium};
  background-color: ${() => theme.colors.primary};
  color: ${() => theme.colors.white};
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${() => theme.colors.secondary};
  }
`;

const ErrorMessage = styled.p`
  color: ${() => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  font-size: 0.9rem;
`;

const LoginLink = styled.p`
  margin-top: ${() => theme.spacing.large};
  color: ${() => theme.colors.gray};
  font-size: 0.9rem;

  a {
    color: ${() => theme.colors.primary};
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
    <Shape color="#E84A5F" style={{ width: 200, height: 200, top: '15%', right: '10%' }} />
    <Shape color="#9D65C9" style={{ width: 150, height: 150, bottom: '15%', left: '20%', animationDelay: '4s' }} />
  </>
);


export default RegisterPage;