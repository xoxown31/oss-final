
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RecordItem = ({ record }) => {
  return (
    <ItemWrapper
      as={Link}
      to={`/record/${record.id}`}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <CoverImage src={record.coverImage} alt={record.title} />
      <Info>
        <Title>{record.title}</Title>
        <Author>{record.author}</Author>
      </Info>
      <Rating>
        {Array(record.userRating)
          .fill('★')
          .join('')}
        {Array(5 - record.userRating)
          .fill('☆')
          .join('')}
      </Rating>
    </ItemWrapper>
  );
};

const ItemWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.gray}33;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: box-shadow 0.2s, border-color 0.2s;
  text-decoration: none;
  color: inherit;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.small};
    border-color: ${({ theme }) => theme.colors.gray}66;
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const CoverImage = styled.img`
    width: 50px;
    height: 70px;
    object-fit: cover;
    border-radius: 4px;
    flex-shrink: 0;
`;

const Info = styled.div`
    flex-grow: 1;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
`;

const Author = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray};
`;

const Rating = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.accent};
`;

export default RecordItem;

