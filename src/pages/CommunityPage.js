import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { getPublicRecords } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import UserProfileModal from '../components/UserProfileModal';
import { DEFAULT_PROFILE_IMAGE_URL } from '../constants';
import { useAuth } from '../contexts/AuthContext';

const CommunityPage = () => {
  const [publicRecords, setPublicRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    getPublicRecords()
      .then(data => {
        const sortedData = data.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
        
        setPublicRecords(sortedData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user?.id]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsProfileModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsProfileModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <Wrapper 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <h1>Community Feed</h1>
        <p>See what others in the Bookend community are reading.</p>
      </Header>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Grid>
          {publicRecords.map((record, index) => (
            <Card
              key={record.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <CoverImage src={record.coverImage} alt={record.title} />
              <CardContent>
                <Title>{record.title}</Title>
                <Author>by {record.author}</Author>
                <Rating>
                  {Array(record.userRating).fill('★').join('')}
                  {Array(5 - record.userRating).fill('☆').join('')}
                </Rating>
                <Notes>{record.notes}</Notes>
                <UserInfo>
                  <ProfileImage
                    src={
                      record.userProfileImageUrl && (record.userProfileImageUrl.startsWith('http') || record.userProfileImageUrl.startsWith('https'))
                        ? record.userProfileImageUrl
                        : DEFAULT_PROFILE_IMAGE_URL
                    }
                    alt={record.username}
                    onClick={() => handleUserClick({
                      id: record.userid, 
                      username: record.username,
                      profileImageUrl: record.userProfileImageUrl && (record.userProfileImageUrl.startsWith('http') || record.userProfileImageUrl.startsWith('https'))
                        ? record.userProfileImageUrl
                        : DEFAULT_PROFILE_IMAGE_URL
                    })}
                  />
                  Shared by <Username onClick={() => handleUserClick({
                    id: record.userid,
                    username: record.username,
                    profileImageUrl: record.userProfileImageUrl && (record.userProfileImageUrl.startsWith('http') || record.userProfileImageUrl.startsWith('https'))
                      ? record.userProfileImageUrl
                      : DEFAULT_PROFILE_IMAGE_URL
                  })}>@{record.username || 'anonymous'}</Username>
                </UserInfo>
              </CardContent>
            </Card>
          ))}
        </Grid>
      )}
      <AnimatePresence>
        {isProfileModalOpen && <UserProfileModal user={selectedUser} onClose={handleCloseModal} />}
      </AnimatePresence>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
`;

const Header = styled(motion.div)`
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

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.small};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
    transform: translateY(-5px);
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.medium};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Author = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Rating = styled(motion.div)`
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Notes = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  flex-grow: 1;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  white-space: pre-wrap;
`;

const UserInfo = styled(motion.div)`
  font-size: 0.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray};
  text-align: right;
  border-top: 1px solid ${({ theme }) => theme.colors.gray}33;
  padding-top: ${({ theme }) => theme.spacing.small};
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: ${({ theme }) => theme.spacing.small};
  cursor: pointer;
`;

const Username = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default CommunityPage;