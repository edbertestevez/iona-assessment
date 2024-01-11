import React from 'react';
import { Alert, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ErrorCat from '../../assets/error.gif';
import AppRoutes from '../../config/routes';
import MESSAGES from '../../constants/messages';

const ErrorFallback: React.FC = () => {
  return (
    <Wrapper>
      <ErrorMedia src={ErrorCat} roundedCircle />
      <Alert variant="danger">{MESSAGES.genericError}</Alert>

      <Link to={AppRoutes.Root}>
        <Button>Return to homepage</Button>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
`;

const ErrorMedia = styled(Image)`
  max-width: 300px;
  object-fit: contain;
`;

export default ErrorFallback;
