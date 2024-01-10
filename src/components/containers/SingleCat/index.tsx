import React, { useMemo } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Image,
  Col,
  Row,
} from 'react-bootstrap';
import { Link, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';

import AppRoutes from '../../../config/routes';
import { BreedImage } from '../../../types/Breed';

const SingleCat: React.FC = () => {
  const breed = useLoaderData() as BreedImage;

  const breedInfo = useMemo(() => breed.breeds?.[0], [breed.breeds]);

  if (!breed) {
    return <p>Loading cat breed. . .</p>;
  }

  return (
    <InfoContainer>
      <Card>
        <CardHeader>
          <Link to={`${AppRoutes.Root}?breed=${breedInfo.id}`}>
            <Button>Back</Button>
          </Link>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={12} lg={6}>
              <StyledImage src={breed.url} />
            </Col>
            <Col>
              <Name>{breedInfo?.name}</Name>
              <Origin>
                <b>Origin: </b>
                {breedInfo?.origin}
              </Origin>
              <i>
                <p>{breedInfo?.temperament}</p>
              </i>
              <p>{breedInfo?.description}</p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </InfoContainer>
  );
};

const InfoContainer = styled(Container)`
  padding: 32px;
`;

const StyledImage = styled(Image)`
  width: 100%;
`;

const Name = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const Origin = styled.p`
  font-size: 18px;
`;

export default SingleCat;
