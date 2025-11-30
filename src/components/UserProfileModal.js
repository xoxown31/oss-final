import React from 'react';
import styled from 'styled-components';
import { DEFAULT_PROFILE_IMAGE_URL } from '../constants';

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
  margin-bottom: 1.5rem;
`;

const CloseButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

const UserProfileModal = ({ user, onClose }) => {
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
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UserProfileModal;
