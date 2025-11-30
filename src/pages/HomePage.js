
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { FaBookReader, FaUsers, FaChartLine } from 'react-icons/fa';
import { getPublicRecords } from '../api';

const FeatureCard = ({ icon, title, text }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div ref={ref} animate={controls} initial="hidden" variants={cardVariants}>
      <Card>
        <Icon>{icon}</Icon>
        <h3>{title}</h3>
        <p>{text}</p>
      </Card>
    </motion.div>
  );
};

const LivePreview = () => {
  const [latestRecord, setLatestRecord] = useState(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    getPublicRecords().then(records => {
      if (records && records.length > 0) {
        // Get the most recent record
        records.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLatestRecord(records[0]);
      }
    });
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, scale: 1, transition: { type: 'spring', duration: 0.8 } });
    }
  }, [controls, inView]);

  return (
    <LivePreviewWrapper ref={ref}>
      <h2>Live Community Preview</h2>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={controls}>
        {latestRecord ? (
          <PreviewCard>
            <img src={latestRecord.coverImage} alt={latestRecord.title} />
            <div>
              <h4>{latestRecord.title}</h4>
              <p>"{latestRecord.notes}"</p>
              <span>- @{latestRecord.username}</span>
            </div>
          </PreviewCard>
        ) : (
          <p>No public records yet. Be the first to share!</p>
        )}
      </motion.div>
    </LivePreviewWrapper>
  )
}

const HomePage = () => {
  return (
    <PageWrapper>
      <HeroSection>
        <Content
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <Title>Welcome to Bookend</Title>
          <Subtitle>Discover your next favorite book, together.</Subtitle>
          <Description>
            Track your reading journey, share your thoughts with a vibrant community, and see what's trending in the world of literature.
          </Description>
          <CtaButton as={Link} to="/register">Get Started For Free</CtaButton>
        </Content>
        <AnimatedShapes />
      </HeroSection>

      <FeaturesSection>
        <h2>Everything you need to enhance your reading life.</h2>
        <CardsContainer>
          <FeatureCard 
            icon={<FaBookReader />} 
            title="Track Your Reading" 
            text="Effortlessly log the books you read, your ratings, and personal notes."
          />
          <FeatureCard 
            icon={<FaUsers />} 
            title="Join the Community" 
            text="Share your reviews and discover what others are reading in the community feed."
          />
          <FeatureCard 
            icon={<FaChartLine />} 
            title="Discover Trends" 
            text="Find out which books are hot, most read, and top-rated by the community."
          />
        </CardsContainer>
      </FeaturesSection>
      <LivePreview />
    </PageWrapper>
  );
};

// ... (Keyframes and Hero Section styled-components remain the same)
const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`;

const move = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
`;

const HeroSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  position: relative;
`;

const Content = styled(motion.div)`
  text-align: center;
  z-index: 2;
  padding: 0 ${({ theme }) => theme.spacing.medium};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const Description = styled.p`
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text}aa;
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const CtaButton = styled(motion.a)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.xlarge};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }
`;

const Shape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  opacity: 0.1;
  animation: ${move} 10s infinite ease-in-out;
`;

const AnimatedShapes = () => (
  <>
    <Shape color="#6C5B7B" style={{ width: 200, height: 200, top: '10%', left: '15%' }} />
    <Shape color="#C06C84" style={{ width: 150, height: 150, bottom: '20%', right: '20%', animationDelay: '3s' }} />
    <Shape color="#F67280" style={{ width: 100, height: 100, top: '25%', right: '10%', animationDelay: '6s' }} />
    <Shape color="#8884d8" style={{ width: 120, height: 120, bottom: '15%', left: '5%', animationDelay: '9s' }} />
  </>
);

// --- New Styled Components ---
const FeaturesSection = styled.section`
  padding: 100px ${({ theme }) => theme.spacing.large};
  text-align: center;

  h2 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  }
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.large};
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  width: 300px;
  text-align: center;

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: ${({ theme }) => theme.spacing.medium};
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const LivePreviewWrapper = styled.section`
  padding: 100px ${({ theme }) => theme.spacing.large};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.card};
  
  h2 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  }
`;

const PreviewCard = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: ${({ theme }) => theme.spacing.large};
  display: flex;
  gap: ${({ theme }) => theme.spacing.large};
  text-align: left;

  img {
    width: 100px;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
  }

  h4 {
    font-size: 1.3rem;
    font-weight: bold;
  }

  p {
    font-style: italic;
    color: ${({ theme }) => theme.colors.text}aa;
    margin: ${({ theme }) => theme.spacing.medium} 0;
  }
  
  span {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;


export default HomePage;
