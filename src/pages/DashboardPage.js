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
import TutorialModal from '../components/TutorialModal';
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
  
  const lastEightMonths = Array.from({ length: 8 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return monthNames[d.getMonth()];
  }).reverse();

  return lastEightMonths.map(month => ({
    name: month,
    count: monthlyCounts[month] || 0
  }));
};

const DashboardPage = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTutorial, setShowTutorial] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecords(user.id);
        setRecords(data);
        if (user.isNewUser) {
          setShowTutorial(true);
        }
      } catch (error) {
        console.error("Failed to fetch records", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.id, user.isNewUser]);

  const filteredRecords = useMemo(() => {
    if (!debouncedSearchTerm) return records;
    return records.filter(record => 
      record.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      record.author.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [records, debouncedSearchTerm]);

  const stats = useMemo(() => {
    const totalBooks = records.length;
    const totalPages = records.reduce((acc, r) => acc + (r.pageCount || 0), 0);
    const averageRating = totalBooks > 0 
      ? (records.reduce((acc, r) => acc + r.userRating, 0) / totalBooks).toFixed(1) 
      : 0;
    return { totalBooks, totalPages, averageRating };
  }, [records]);

  const chartData = useMemo(() => processChartData(records), [records]);

  if (loading) return <LoadingSpinner />;

  return (
    <Wrapper
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Header variants={itemVariants}>
        <h1>My Library</h1>
        <p>Welcome back, {user.username}!</p>
      </Header>

      <StatsGrid>
        <motion.div variants={itemVariants}>
          <StatCard icon={<FaBook />} title="Total Books" value={stats.totalBooks} color="#4e54c8" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard icon={<FaBook />} title="Read Books" value={stats.totalBooks} color="#11998e" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard icon={<FaStar />} title="Avg Rating" value={stats.averageRating} color="#f2994a" />
        </motion.div>
      </StatsGrid>

      {records.length > 0 && (
        <ChartSection variants={itemVariants}>
          <h2>Reading Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8f94fb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartSection>
      )}

      <RecordsSection variants={itemVariants}>
        <Toolbar>
          <h2>Recent Records</h2>
          <SearchWrapper>
            <FaSearch />
            <SearchInput 
              type="text" 
              placeholder="Search your library..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchWrapper>
        </Toolbar>
        <RecordList records={filteredRecords} />
      </RecordsSection>

      <FloatingActionButton />
      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
`;

const Header = styled(motion.div)`
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
  p {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const ChartSection = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};

  h2 {
    font-size: 1.4rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.large};
  }
`;

const RecordsSection = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.large};
`;

const Toolbar = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const SearchWrapper = styled(motion.div)`
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } 
};

export default DashboardPage;