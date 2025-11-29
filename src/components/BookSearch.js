
import React, { useState } from 'react';
import styled from 'styled-components';
import { searchBooks } from '../api';
import BookSearchResultList from './BookSearchResultList';
import useDebounce from '../hooks/useDebounce';

const BookSearch = ({ onBookSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const debouncedQuery = useDebounce(query, 500);

  React.useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      searchBooks(debouncedQuery)
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Search for a book by title or author..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p>Searching...</p>}
      <BookSearchResultList results={results} onBookSelect={onBookSelect} />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.medium};
  font-size: 1.1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray}33;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export default BookSearch;
