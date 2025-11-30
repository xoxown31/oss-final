
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { generateDemoData } from '../api/demoData';

const DevPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState('');

  const handleGenerateData = async () => {
    setIsGenerating(true);
    setMessage('Generating data... this may take a moment.');
    const result = await generateDemoData();
    if (result.success) {
      setMessage(result.message || 'Demo data generation complete!');
    } else {
      setMessage(result.message || 'Failed to generate demo data.');
    }
    setIsGenerating(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Wrapper>
        <Header>
          <h1>Developer Tools</h1>
          <p>Use these tools for testing and demonstration.</p>
        </Header>
        <ToolSection>
          <h2>Demo Data Generator</h2>
          <p>
            This will create 3 new users and 20 new reading records in your database. 
            This action is irreversible through the UI.
          </p>
          <GenerateButton onClick={handleGenerateData} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Demo Data'}
          </GenerateButton>
          {message && <ResultMessage>{message}</ResultMessage>}
        </ToolSection>
      </Wrapper>
    </motion.div>
  );
};

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  h1 { font-size: 2.5rem; font-weight: bold; color: ${({ theme }) => theme.colors.primary}; }
  p { font-size: 1.2rem; color: ${({ theme }) => theme.colors.gray}; }
`;

const ToolSection = styled.div`
  background: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.small};
  max-width: 600px;

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: ${({ theme }) => theme.spacing.medium};
  }
  p {
    margin-bottom: ${({ theme }) => theme.spacing.large};
    line-height: 1.6;
  }
`;

const GenerateButton = styled.button`
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  font-weight: bold;
  box-shadow: ${({ theme }) => theme.shadows.small};
  cursor: pointer;
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray};
    cursor: not-allowed;
  }
`;

const ResultMessage = styled.div`
  margin-top: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.medium};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.gray}33;
`;

export default DevPage;
