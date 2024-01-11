import axios from 'axios';

import { CATS_API_KEY } from '../config/api';
import { Breed, BreedImage } from '../types/Breed';

const RESPONSE_LIMIT = 10;

export const getAllBreeds = async (): Promise<Breed[]> => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (err) {
    console.error('Error fetching cat breeds data: ', err);
    throw err;
  }
};

type GetBreedImagesProps = {
  page: number;
  breedId: string;
};

// Only get the required info to display images. Skip other info to make response faster.
export const getBreedImages = async ({
  page,
  breedId,
}: GetBreedImagesProps): Promise<BreedImage[]> => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?page=${page}&limit=${RESPONSE_LIMIT}&breed_ids=${breedId}&size=thumb&has_breeds=true&include_breeds=0&include_categories=0`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CATS_API_KEY,
        },
      },
    );

    return response.data;
  } catch (err) {
    console.error('Error fetching cat breed images data: ', err);
    throw err;
  }
};

export const getBreedImageWithInfo = async (imageId: string) => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/${imageId}`,
    );

    return response.data;
  } catch (err) {
    console.error('Error fetching cat breed image with info data: ', err);
    throw err;
  }
};
