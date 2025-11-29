import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import { FaBook, FaStar, FaSearch } from 'react-icons/fa';
import { getRecords } from '../api';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/StatCard';
import RecordList from '../components/RecordList';
import FloatingActionButton from '../components/FloatingActionButton';
import LoadingSpinner from '../components/LoadingSpinner';
import useDebounce from '../hooks/useDebounce';

const processChartData = (records) => {
  if (!records || records.length === 0) return [];
  const monthlyCounts = records.reduce((acc, record) => {
    if (record.endDate) {
      const month = new Date(record.endDate).toLocaleString('en-US', { month: 'short' });
      acc[month] = (acc[month] || 0) + 1;
    }
    return acc;
  }, {});
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return monthNames[d.getMonth()];
  }).reverse();
  return lastSixMonths.map(month => ({ month, books: monthlyCounts[month] || 0 }));
};

const DashboardPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('endDate-desc');
  const { user } = useAuth();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    setLoading(true);
    getRecords(user.id)
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user.id]);

  const { totalBooks, averageRating } = useMemo(() => {
    if (!records || records.length === 0) {
      return { totalBooks: 0, averageRating: 'N/A' };
    }
    const ratedRecords = records.filter(r => r.userRating > 0);
    const totalRating = ratedRecords.reduce((sum, r) => sum + r.userRating, 0);
    const avgRating = ratedRecords.length > 0 ? (totalRating / ratedRecords.length).toFixed(1) : 'N/A';
    return {
      totalBooks: records.length,
      averageRating: avgRating,
    };
  }, [records]);

  const displayedRecords = useMemo(() => {
    return records
      .filter(record =>
        record.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        record.author.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const [sortField, sortOrder] = sortBy.split('-');
        if (!a[sortField] || !b[sortField]) return 0;
        const valA = typeof a[sortField] === 'string' ? a[sortField].toLowerCase() : a[sortField];
        const valB = typeof b[sortField] === 'string' ? b[sortField].toLowerCase() : b[sortField];

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [records, debouncedSearchQuery, sortBy]);

  const chartData = useMemo(() => processChartData(records), [records]);

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <StatsContainer>
          <StatCard icon={<FaBook />} title="Total Books Read" value={totalBooks} />
          <StatCard icon={<FaStar />} title="Average Rating" value={averageRating} />
        </StatsContainer>
        <DashboardWrapper>
          <ChartContainer>
            <h2>Your Reading Activity</h2>
            {loading ? <LoadingSpinner /> : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}/>
                  <Legend />
                  <Bar dataKey="books" fill="#8884d8" name="Books Read" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartContainer>
          
          <RecordsSection>
            <Toolbar>
              <SearchWrapper>
                <FaSearch />
                <SearchInput 
                  type="text"
                  placeholder="Search your records..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </SearchWrapper>
              <SortSelect value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="endDate-desc">Sort by Date (Newest)</option>
                <option value="endDate-asc">Sort by Date (Oldest)</option>
                <option value="userRating-desc">Sort by Rating (Highest)</option>
                <option value="userRating-asc">Sort by Rating (Lowest)</option>
                <option value="title-asc">Sort by Title (A-Z)</option>
                <option value="author-asc">Sort by Author (A-Z)</option>
              </SortSelect>
            </Toolbar>
            <RecordList records={displayedRecords} loading={loading} />
          </RecordsSection>

        </DashboardWrapper>
      </motion.div>
      <FloatingActionButton to="/add-record">+</FloatingActionButton>
    </>
  );
};

const StatsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const DashboardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.large};
`;

const ChartContainer = styled.div`
  background: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.small};
  min-height: 360px;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 1.4rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.large};
  }
`;

const RecordsSection = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.large};
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.gray}33;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  flex-grow: 1;

  svg {
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  background: transparent;
  font-size: 1rem;
`;

const SortSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.gray}33;
  background: transparent;
  font-size: 1rem;
`;

export default DashboardPage;