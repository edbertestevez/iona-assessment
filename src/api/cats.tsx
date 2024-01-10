import axios from 'axios';

import { CATS_API_KEY } from '../config/api';
import { Breed, BreedImage } from '../types/Breed';

export const getAllBreeds = async (): Promise<Breed[]> => {
  try {
    const breeds = await axios.get(
      `https://api.thecatapi.com/v1/breeds?api_key=${CATS_API_KEY}`,
    );
    return breeds.data;
  } catch (err) {
    console.error('Error fetching cat breeds data: ', err);
    throw err;
  }
};

type GetBreedImagesProps = {
  page: number;
  breedId: string;
};

export const getBreedImages = async ({
  page,
  breedId,
}: GetBreedImagesProps): Promise<BreedImage[]> => {
  try {
    const breedImages = await axios.get(
      `https://api.thecatapi.com/v1/images/search?page=${page}&limit=10&breed_id=${breedId}&api_key=${CATS_API_KEY}`,
    );
    return breedImages.data;
  } catch (err) {
    console.error('Error fetching cat breed images data: ', err);
    throw err;
  }
};
