import React, { useCallback, useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';

import CatCard from './CatCard';
import { HomepageLoaderData } from './loader';
import MESSAGES from '../../../constants/messages';
import { useCatBreedContext } from '../../../context/CatBreedContext';

const Homepage: React.FC = () => {
  const { breeds, breedQuery } = useLoaderData() as HomepageLoaderData;
  const {
    breedId,
    setBreed,
    breedImages,
    getNextPage,
    hasBreedImages,
    isRequested,
    isLoading,
    isError,
    isEndReached,
  } = useCatBreedContext();

  useEffect(() => {
    if (breedQuery && breedId !== breedQuery && breedId === '') {
      setBreed(breedQuery);
    }
  }, [breedId, breedQuery, setBreed]);

  const handleBreedChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const currBreedId = event.target.value;
      setBreed(currBreedId);
    },
    [setBreed],
  );

  const handleNextPage = useCallback(() => {
    getNextPage();
  }, [getNextPage]);

  return (
    <Body>
      <Title>Cat Breeds</Title>

      <Selection
        aria-label="Cat Breeds"
        onChange={handleBreedChange}
        value={breedId}
      >
        <option value="">Select Cat Breed</option>

        {breeds?.map(({ id, name }) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </Selection>

      {!hasBreedImages && !isError && (
        <>
          {isRequested && <Info>No cats found</Info>}

          {!isRequested && isLoading && <Info>Loading cats . . .</Info>}
        </>
      )}

      {isError && <Alert variant="danger">{MESSAGES.genericError}</Alert>}

      {hasBreedImages && (
        <>
          <ListContainer fluid>
            <Row>
              {breedImages.map((image) => (
                <ListItem key={image.id} xs={12} s={6} md={4} lg={3}>
                  <CatCard {...image} />
                </ListItem>
              ))}
            </Row>
          </ListContainer>

          {!isEndReached && (
            <Button
              variant="success"
              onClick={handleNextPage}
              disabled={isLoading}
            >
              {isLoading ? 'Loading more cats . . .' : 'Load More'}
            </Button>
          )}
        </>
      )}
    </Body>
  );
};

const Body = styled.div`
  padding: 32px;
`;

const Title = styled.h1``;

const Selection = styled(Form.Select)`
  margin-top: 24px;
  margin-bottom: 24px;
  @media (min-width: 768px) {
    max-width: 400px;
  }
`;

const ListContainer = styled(Container)`
  margin: 0px;
  padding-left: 0px;
  padding-right: 0px;
`;

const ListItem = styled(Col)`
  margin-bottom: 24px;
`;

const Info = styled.p`
  margin: 32px 0px;
`;

export default Homepage;
