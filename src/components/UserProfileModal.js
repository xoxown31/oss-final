import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DEFAULT_PROFILE_IMAGE_URL } from '../constants';
import { getRecords } from '../api';
import LoadingSpinner from './LoadingSpinner';
import { motion } from 'framer-motion';

const ModalOverlay = styled(motion.div)`
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

const ModalContent = styled(motion.div)`
  background-color: white;
  padding: 2rem;
  border-radius: 16px; 
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2); 
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
  min-height: 150px;
  align-items: center;
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
  margin-top: 1rem;

  &:hover {
    background-color: #555;
  }
`;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.1 } }
};

const modalVariants = {
  hidden: { 
    y: 50,   
    opacity: 0, 
    scale: 0.95 
  },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      damping: 25,    
      stiffness: 300  
    } 
  },
  exit: { 
    y: 50,    
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeIn" } 
  }
};

const UserProfileModal = ({ user, onClose }) => {
  const [stats, setStats] = useState({ readCount: 0, averageRating: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (user && user.id) {
        setLoading(true);
        try {
          const records = await getRecords(user.id);
          
          const readCount = records.length;
          const totalRating = records.reduce((acc, r) => acc + (r.userRating || 0), 0);
          const averageRating = readCount > 0 
            ? (totalRating / readCount).toFixed(1)
            : 0;

          setStats({ readCount, averageRating });
        } catch (error) {
          console.error("Failed to fetch user stats:", error);
          setStats({ readCount: 0, averageRating: 0 });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserStats();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <ModalOverlay onClick={onClose}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
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
          {loading ? (
            <LoadingSpinner /> 
          ) : (
            <>
              <StatItem>
                <StatValue>{stats.averageRating}</StatValue>
                <StatLabel>Review</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{stats.readCount}</StatValue>
                <StatLabel>Book</StatLabel>
              </StatItem>
            </>
          )}
        </StatsContainer>

        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UserProfileModal;