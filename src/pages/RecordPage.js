
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getRecord, updateRecord, deleteRecord } from '../api';
import Layout from '../components/Layout';
import StarRating from '../components/StarRating';
import LoadingSpinner from '../components/LoadingSpinner';

const RecordPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // States for the form fields
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    getRecord(id).then(data => {
      setRecord(data);
      setRating(data.userRating);
      setNotes(data.notes);
      setStartDate(data.startDate);
      setEndDate(data.endDate);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      userRating: rating,
      notes,
      startDate,
      endDate,
    };
    try {
      const updated = await updateRecord(id, updatedData);
      setRecord(updated);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update record', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await deleteRecord(id);
        navigate('/');
      } catch (error) {
        console.error('Failed to delete record', error);
      }
    }
  };

  if (!record) {
    return <LoadingSpinner />;
  }

  return (
    <Wrapper>
      <Header>
        <CoverImage src={record.coverImage} alt={record.title} />
        <Info>
          <h1>{record.title}</h1>
          <p>{record.author}</p>
          <p>{record.publisher}</p>
        </Info>
      </Header>
      
      {isEditing ? (
        <Form onSubmit={handleUpdate}>
          <FormSection>
              <label>Rating</label>
              <StarRating rating={rating} onRate={setRating} />
          </FormSection>
          <FormSection>
              <label>Notes</label>
              <TextArea value={notes} onChange={e => setNotes(e.target.value)} rows="5" />
          </FormSection>
          <DateFields>
              <FormSection>
                  <label>Start Date</label>
                  <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </FormSection>
              <FormSection>
                  <label>End Date</label>
                  <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
              </FormSection>
          </DateFields>
          <ButtonContainer>
              <Button primary type="submit">Save Changes</Button>
              <Button type="button" onClick={() => setIsEditing(false)}>Cancel</Button>
          </ButtonContainer>
        </Form>
      ) : (
        <Details>
          <DetailItem>
              <h3>Rating</h3>
              <StarRating rating={record.userRating} onRate={() => {}} />
          </DetailItem>
          <DetailItem>
              <h3>Notes</h3>
              <Notes>{record.notes || 'No notes added.'}</Notes>
          </DetailItem>
          <DetailItem>
              <h3>Dates Read</h3>
              <p>{record.startDate} to {record.endDate}</p>
          </DetailItem>
          <ButtonContainer>
              <Button primary onClick={() => setIsEditing(true)}>Edit</Button>
              <Button onClick={handleDelete}>Delete</Button>
          </ButtonContainer>
        </Details>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;
const Header = styled.div`
    display: flex;
    gap: ${({theme}) => theme.spacing.large};
    padding: ${({theme}) => theme.spacing.large};
    background-color: ${({theme}) => theme.colors.card};
    border-radius: ${({theme}) => theme.borderRadius};
    box-shadow: ${({theme}) => theme.shadows.small};
    margin-bottom: ${({theme}) => theme.spacing.large};
`;
const CoverImage = styled.img`
    width: 150px;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
`;
const Info = styled.div`
    h1 {
        font-size: 2.2rem;
        font-weight: bold;
        color: ${({theme}) => theme.colors.primary};
    }
    p {
        font-size: 1.1rem;
        color: ${({theme}) => theme.colors.text};
        margin-bottom: ${({theme}) => theme.spacing.small};
    }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
  padding: ${({theme}) => theme.spacing.large};
  background-color: ${({theme}) => theme.colors.card};
  border-radius: ${({theme}) => theme.borderRadius};
  box-shadow: ${({theme}) => theme.shadows.small};
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
const Details = styled.div`
    padding: ${({theme}) => theme.spacing.large};
    background-color: ${({theme}) => theme.colors.card};
    border-radius: ${({theme}) => theme.borderRadius};
    box-shadow: ${({theme}) => theme.shadows.small};
    display: flex;
    flex-direction: column;
    gap: ${({theme}) => theme.spacing.large};
`;
const DetailItem = styled.div`
    h3 {
        font-weight: bold;
        font-size: 1.2rem;
        margin-bottom: ${({theme}) => theme.spacing.small};
    }
`;
const Notes = styled.p`
    white-space: pre-wrap;
    line-height: 1.6;
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
  background-color: ${({ theme, primary }) => (primary ? theme.colors.primary : theme.colors.accent)};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;

export default RecordPage;
