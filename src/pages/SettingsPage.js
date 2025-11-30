import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { updateUser, updateReadingRecordsProfileImage } from '../api';
import { motion } from 'framer-motion';
import { DEFAULT_PROFILE_IMAGE_URL } from '../constants';

// Helper function to validate and get profile image URL
const getValidProfileImageUrl = (url) => {
  return url && (url.startsWith('http') || url.startsWith('https'))
    ? url
    : DEFAULT_PROFILE_IMAGE_URL;
};

const SettingsPage = () => {
  const { user, setUser } = useAuth();
  const [profileImageUrl, setProfileImageUrl] = useState(getValidProfileImageUrl(user?.profileImageUrl));
  const [message, setMessage] = useState('');

  useEffect(() => {
    setProfileImageUrl(getValidProfileImageUrl(user?.profileImageUrl));
  }, [user]);

  const handleSave = async () => {
    try {
      // Use the profileImageUrl from state, which might be the default if the input is empty
      const urlToSave = getValidProfileImageUrl(profileImageUrl);

      setUser(prevUser => ({ ...prevUser, profileImageUrl: urlToSave }));
      await updateReadingRecordsProfileImage(user.id, urlToSave);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile.');
      console.error(error);
    }
  };

  return (
    <Wrapper
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Header>
          {console.log(user)}
          <h1>Settings</h1>
          <p>Update your profile information.</p>
        </Header>
        <Form>
          <label htmlFor="profileImageUrl">Profile Image URL</label>
          <Input
            id="profileImageUrl"
            type="text"
            value={profileImageUrl}
            onChange={(e) => setProfileImageUrl(e.target.value)}
          />
          <Button onClick={handleSave}>Save</Button>
          {message && <p>{message}</p>}
        </Form>
      </motion.div>
    </Wrapper>
  );
};

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
  p {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
`;

const Wrapper = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
`;

export default SettingsPage;
