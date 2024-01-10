import React, { useCallback } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';

import CatCard from './CatCard';
import { Breed } from '../../../types/Breed';
import { useCatBreed } from '../../context/CatBreedContext';

const Homepage: React.FC = () => {
  const breeds = useLoaderData() as Breed[];
  const { setBreedId, breedImages, isLoading } = useCatBreed();

  const handleBreedChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setBreedId(value);
    },
    [setBreedId],
  );

  return (
    <Body>
      <Title>Cat Breeds</Title>
      <Selection aria-label="Cat Breeds" onChange={handleBreedChange}>
        <option value="">Select Cat Breed</option>

        {breeds?.map(({ id, name }) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </Selection>

      {isLoading && <Loader>Loading meow meows...</Loader>}

      {!isLoading && (
        <ListContainer fluid>
          <Row>
            {breedImages.map((image) => (
              <ListItem key={image.id} xs={12} s={6} md={4} lg={3}>
                <CatCard {...image} />
              </ListItem>
            ))}
          </Row>
        </ListContainer>
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
  @media (min-width: 768px) {
    max-width: 400px;
  }
`;

const Loader = styled.p`
  margin: 32px 0px;
`;

const ListContainer = styled(Container)`
  margin: 32px 0px;
  padding-left: 0px;
  padding-right: 0px;
`;

const ListItem = styled(Col)`
  margin-bottom: 24px;
`;

export default Homepage;
