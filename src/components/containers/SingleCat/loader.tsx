import { LoaderFunctionArgs } from 'react-router-dom';

import api from '../../../api';
import { BreedImage } from '../../../types/Breed';

const SingleCatLoader = async ({ params }: LoaderFunctionArgs) => {
  const breed: BreedImage =
    params.imageId && (await api.getBreedImageWithInfo(params.imageId));

  return breed;
};

export default SingleCatLoader;
