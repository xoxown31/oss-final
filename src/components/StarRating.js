
import React from 'react';
import styled from 'styled-components';

const StarRating = ({ rating, onRate }) => {
  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <Star
            key={ratingValue}
            filled={ratingValue <= rating}
            onClick={() => onRate(ratingValue)}
          >
            ★
          </Star>
        );
      })}
    </div>
  );
};

const Star = styled.span`
  cursor: pointer;
  font-size: 2.5rem;
  color: ${({ theme, filled }) => (filled ? theme.colors.accent : theme.colors.gray + '55')};
  transition: color 0.2s;
`;

export default StarRating;
