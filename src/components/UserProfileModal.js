import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DEFAULT_PROFILE_IMAGE_URL } from '../constants';
import { getRecords } from '../api';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const Username = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
  width: 100%;
  padding: 1rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
`;

const StatLabel = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
`;

const CloseButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #555;
  }
`;

const UserProfileModal = ({ user, onClose }) => {
  const [stats, setStats] = useState({ readCount: 0, reviewCount: 0 });

  useEffect(() => {
    const fetchUserStats = async () => {
      if (user && user.id) {
        try {
          const records = await getRecords(user.id);
          const readCount = records.length;
          
          const reviewCount = records.filter(
            (r) => r.notes && r.notes.trim().length > 0
          ).length;

          setStats({ readCount, reviewCount });
        } catch (error) {
          console.error("Failed to fetch user stats:", error);
          setStats({ readCount: 0, reviewCount: 0 });
        }
      }
    };

    fetchUserStats();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ProfileImage
          src={
            user.profileImageUrl && (user.profileImageUrl.startsWith('http') || user.profileImageUrl.startsWith('https'))
              ? user.profileImageUrl
              : DEFAULT_PROFILE_IMAGE_URL
          }
          alt={user.username}
        />
        <Username>{user.username}</Username>
        
        <StatsContainer>
          <StatItem>
            <StatValue>{stats.reviewCount}</StatValue>
            <StatLabel>Review</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{stats.readCount}</StatValue>
            <StatLabel>Book</StatLabel>
          </StatItem>
        </StatsContainer>

        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UserProfileModal;