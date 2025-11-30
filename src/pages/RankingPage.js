import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { getPublicRecords } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import RankingList from '../components/RankingList';

const calculateRankings = (records) => {
  if (!records || records.length === 0) {
    return { hot: [], mostRead: [], topRated: [] };
  }

  const books = {};
  let totalRatingsSum = 0;
  let totalRatingsCount = 0;

  records.forEach(record => {
    totalRatingsSum += record.userRating;
    totalRatingsCount++;

    const identifier = record.title + record.author;
    if (!books[identifier]) {
      books[identifier] = {
        title: record.title,
        author: record.author,
        coverImage: record.coverImage,
        ratings: [],
        readCount: 0,
        hotScore: 0,
      };
    }
    const book = books[identifier];
    book.readCount++;
    book.ratings.push(record.userRating);

    const ageInDays = (new Date() - new Date(record.createdAt)) / (1000 * 3600 * 24);
    book.hotScore += 1 / (ageInDays + 2);
  });

  const allBooks = Object.values(books);

  const C = totalRatingsCount > 0 ? totalRatingsSum / totalRatingsCount : 3;
  const m = 2;

  allBooks.forEach(book => {
    const R = book.ratings.reduce((a, b) => a + b, 0) / book.ratings.length;
    const v = book.ratings.length;
    
    book.averageRating = R;
    book.adjustedScore = (v / (v + m)) * R + (m / (v + m)) * C;
  });

  const hot = [...allBooks].sort((a, b) => b.hotScore - a.hotScore).slice(0, 10);
  const mostRead = [...allBooks].sort((a, b) => b.readCount - a.readCount).slice(0, 10);
  const topRated = [...allBooks]
    .filter(b => b.ratings.length >= m)
    .sort((a, b) => b.adjustedScore - a.adjustedScore)
    .slice(0, 10);

  return { hot, mostRead, topRated };
};

const RankingPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hot');

  useEffect(() => {
    setLoading(true);
    getPublicRecords()
      .then(data => {
        setRecords(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const rankings = useMemo(() => calculateRankings(records), [records]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Header>
        <h1>Community Rankings</h1>
        <p>Discover books that are popular, highly-rated, and trending now.</p>
      </Header>
      
      <Tabs>
        <TabButton active={activeTab === 'hot'} onClick={() => setActiveTab('hot')}>Hot</TabButton>
        <TabButton active={activeTab === 'mostRead'} onClick={() => setActiveTab('mostRead')}>Most Read</TabButton>
        <TabButton active={activeTab === 'topRated'} onClick={() => setActiveTab('topRated')}>Top Rated</TabButton>
      </Tabs>
      
      {loading ? <LoadingSpinner /> : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'hot' && <RankingList title="Trending Now" books={rankings.hot} metric="hotScore" />}
            {activeTab === 'mostRead' && <RankingList title="All-Time Most Read" books={rankings.mostRead} metric="readCount" />}
            {activeTab === 'topRated' && <RankingList title="Community Top Rated" books={rankings.topRated} metric="averageRating" />}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  h1 { font-size: 2.5rem; font-weight: bold; color: ${({ theme }) => theme.colors.primary}; }
  p { font-size: 1.2rem; color: ${({ theme }) => theme.colors.gray}; }
`;

const Tabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const TabButton = styled.button`
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.large};
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 2px solid transparent;
  background-color: ${({ theme, active }) => (active ? theme.colors.primary + '22' : theme.colors.card)};
  color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.text)};
  box-shadow: ${({ theme }) => theme.shadows.small};
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}22;
  }
`;

export default RankingPage;