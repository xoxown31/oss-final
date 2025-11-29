import React from 'react';
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
import Layout from '../components/Layout';
import RecordList from '../components/RecordList';
import FloatingActionButton from '../components/FloatingActionButton';

// Mock data for the chart. This will be replaced with dynamic data.
const chartData = [
  { month: 'Jul', books: 2 },
  { month: 'Aug', books: 3 },
  { month: 'Sep', books: 1 },
  { month: 'Oct', books: 4 },
  { month: 'Nov', books: 5 },
  { month: 'Dec', books: 2 },
];

const DashboardPage = () => {
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
          </ChartContainer>
          <RecordList />
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

  h2 {
    font-size: 1.4rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.large};
  }
`;

export default DashboardPage;