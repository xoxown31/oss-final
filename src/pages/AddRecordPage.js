
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createRecord } from '../api';
import Layout from '../components/Layout';
import BookSearch from '../components/BookSearch';
import StarRating from '../components/StarRating';

const AddRecordPage = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBookSelect = (book) => {
    setSelectedBook({
      title: book.title.replace(/<[^>]+>/g, ''),
      author: book.author.replace(/<[^>]+>/g, ''),
      coverImage: book.image,
      publisher: book.publisher,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecord = {
      userId: user.id,
      ...selectedBook,
      userRating: rating,
      notes,
      startDate,
      endDate,
    };

    try {
      await createRecord(newRecord);
      navigate('/');
    } catch (error) {
      console.error('Failed to create record:', error);
      // You could show an error message to the user here
    }
  };

  return (
    <Wrapper>
      <Header>
        <h1>Add a New Record</h1>
        <p>Search for a book and add your thoughts.</p>
      </Header>
      
      {!selectedBook ? (
        <BookSearch onBookSelect={handleBookSelect} />
      ) : (
        <Form onSubmit={handleSubmit}>
          <SelectedBook>
            <CoverImage src={selectedBook.coverImage} alt={selectedBook.title} />
            <div>
              <h2>{selectedBook.title}</h2>
              <p>{selectedBook.author}</p>
            </div>
          </SelectedBook>
          
          <FormSection>
            <label>How would you rate it?</label>
            <StarRating rating={rating} onRate={setRating} />
          </FormSection>

          <FormSection>
            <label htmlFor="notes">Your thoughts</label>
            <TextArea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What did you think of this book?"
              rows="4"
            />
          </FormSection>

          <DateFields>
            <FormSection>
              <label htmlFor="startDate">Start Date</label>
              <Input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FormSection>
            <FormSection>
              <label htmlFor="endDate">End Date</label>
              <Input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FormSection>
          </DateFields>
          
          <ButtonContainer>
            <Button type="submit" primary>Save Record</Button>
            <Button type="button" onClick={() => setSelectedBook(null)}>
              Choose a different book
            </Button>
          </ButtonContainer>
        </Form>
      )}
    </Wrapper>
  );
};

// ... styled components from before, with additions
const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  h1 {
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
  p {
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
`;

const SelectedBook = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.gray}33;

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }
  p {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const CoverImage = styled.img`
  width: 80px;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
  
  label {
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.medium};
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray}33;
  border-radius: 4px;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.medium};
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray}33;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
`;

const DateFields = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  background-color: ${({ theme, primary }) => (primary ? theme.colors.primary : 'transparent')};
  color: ${({ theme, primary }) => (primary ? theme.colors.white : theme.colors.primary)};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme, primary }) => (primary ? theme.colors.secondary : theme.colors.primary)};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default AddRecordPage;
