
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BookSearchResultList = ({ results, onBookSelect }) => {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <List>
      {results.map((book) => (
        <ListItem
          key={book.isbn}
          onClick={() => onBookSelect(book)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CoverImage src={book.image} alt={book.title} />
          <Info>
            <Title dangerouslySetInnerHTML={{ __html: book.title }} />
            <Author dangerouslySetInnerHTML={{ __html: book.author }} />
            <Publisher>{book.publisher}</Publisher>
          </Info>
        </ListItem>
      ))}
    </List>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  max-height: 400px;
  overflow-y: auto;
`;

const ListItem = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.gray}33;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    box-shadow: ${({ theme }) => theme.shadows.small};
  }
`;

const CoverImage = styled.img`
  width: 60px;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
`;

const Info = styled.div``;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
`;

const Author = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
`;

const Publisher = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray};
`;

export default BookSearchResultList;
