
import React from 'react';
import styled from 'styled-components';

const RankingList = ({ title, books, metric }) => {
  const getMetricDisplay = (book) => {
    switch (metric) {
      case 'hotScore':
        return `${book.hotScore.toFixed(2)} pts`;
      case 'readCount':
        return `${book.readCount} reads`;
      case 'averageRating':
        return `${book.averageRating.toFixed(1)} ★ (${book.ratings.length} ratings)`;
      default:
        return '';
    }
  };

  return (
    <ListContainer>
      <h2>{title}</h2>
      <List>
        {books.map((book, index) => (
          <ListItem key={book.title + book.author}>
            <Rank>{index + 1}</Rank>
            <CoverImage src={book.coverImage} alt={book.title} />
            <BookInfo>
              <Title>{book.title}</Title>
              <Author>{book.author}</Author>
            </BookInfo>
            <Metric>{getMetricDisplay(book)}</Metric>
          </ListItem>
        ))}
      </List>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.large};

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: ${({ theme }) => theme.spacing.large};
  }
`;

const List = styled.ol`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: ${({ theme }) => theme.transition};

  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.background};
  }

  &:hover {
    transform: translateX(10px);
    background-color: ${({ theme }) => theme.colors.card};
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const Rank = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray};
  width: 40px;
  text-align: center;
`;

const CoverImage = styled.img`
  width: 50px;
  height: 75px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const BookInfo = styled.div`
  flex-grow: 1;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
`;

const Author = styled.p`
  color: ${({ theme }) => theme.colors.gray};
`;

const Metric = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export default RankingList;
