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
import { getRecords } from '../api';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import RecordList from '../components/RecordList';
import FloatingActionButton from '../components/FloatingActionButton';
import LoadingSpinner from '../components/LoadingSpinner';

const processChartData = (records) => {
  if (!records || records.length === 0) {
    return [];
  }

  const monthlyCounts = records.reduce((acc, record) => {
    if (record.endDate) {
      const month = new Date(record.endDate).toLocaleString('en-US', { month: 'short' });
      acc[month] = (acc[month] || 0) + 1;
    }
    return acc;
  }, {});

  // Ensure we have data for the last 6 months, even if it's 0
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const lastSixMonths = [];
  const d = new Date();
  for(let i=5; i>=0; i--) {
      lastSixMonths.push(monthNames[(d.getMonth() - i + 12) % 12]);
  }
  
  return lastSixMonths.map(month => ({
    month,
    books: monthlyCounts[month] || 0,
  }));
};

const DashboardPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
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

  const chartData = useMemo(() => processChartData(records), [records]);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <DashboardWrapper>
          <ChartContainer>
            <h2>Your Reading Activity</h2>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="books"
                    fill="#8884d8"
                    name="Books Read"
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartContainer>
          <RecordList records={records} loading={loading} />
        </DashboardWrapper>
      </motion.div>
      <FloatingActionButton to="/add-record">+</FloatingActionButton>
    </Layout>
  );
};

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

export default DashboardPage;
