
import React from 'react';
import styled from 'styled-components';
import RecordItem from './RecordItem';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router-dom';

const RecordList = ({ records, loading }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ListContainer>
      <h2>Your Records</h2>
      {records && records.length > 0 ? (
        <List>
          {records.map((record) => (
            <RecordItem key={record.id} record={record} />
          ))}
        </List>
      ) : (
        <EmptyState>
          <p>You haven't added any records yet.</p>
          <AddLink to="/add-record">Add your first book!</AddLink>
        </EmptyState>
      )}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  background: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.small};
  min-height: 200px;

  h2 {
    font-size: 1.4rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.large};
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.large};
  color: ${({ theme }) => theme.colors.gray};
`;

const AddLink = styled(Link)`
  margin-top: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;


export default RecordList;

