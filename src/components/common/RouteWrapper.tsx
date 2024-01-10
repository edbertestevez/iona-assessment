import React from 'react';
import { Image } from 'react-bootstrap';
import { useNavigation, Outlet } from 'react-router-dom';
import styled from 'styled-components';

import LoadingCat from '../../assets/loading.gif';

// Wraps the routes to show suspense fallback while route loaders are loading
const RouteWrapper: React.FC = () => {
  const { state } = useNavigation();

  if (state === 'loading') {
    return (
      <Wrapper>
        <Loader src={LoadingCat} />
      </Wrapper>
    );
  }

  return <Outlet />;
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = styled(Image)`
  background-color: #fff;
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

export default RouteWrapper;
