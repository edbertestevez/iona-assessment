import React from 'react';
import { Button, Card, CardBody, CardFooter, Image } from 'react-bootstrap';
import styled from 'styled-components';

import { BreedImage } from '../../../types/Breed';

const CatCard: React.FC<BreedImage> = ({ id, url }) => {
  return (
    <StyledCard>
      <StyledBody>
        <StyledImage src={url} alt={id} />
      </StyledBody>
      <StyledFooter>
        <Button variant="link">View Details</Button>
      </StyledFooter>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  border-radius: 8px;
`;

const StyledBody = styled(CardBody)`
  width: 100%;
  padding: 0px;
  height: 300px;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 0%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const StyledFooter = styled(CardFooter)`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    text-decoration: none;
  }
`;

export default CatCard;
