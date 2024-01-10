import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  createContext,
  useState,
} from 'react';

import api from '../../api';
import { BreedImage } from '../../types/Breed';

interface CatBreedContextProps {
  breedId: string;
  setBreedId: React.Dispatch<React.SetStateAction<string>>;
  breedImages: BreedImage[];
  setBreedImages: React.Dispatch<React.SetStateAction<BreedImage[]>>;
  isLoading: boolean;
}

const CatBreedContext = createContext<CatBreedContextProps | undefined>(
  undefined,
);

const CatBreedProvider = ({ children }: { children: ReactNode }) => {
  const [breedId, setBreedId] = useState<string>('');
  const [breedImages, setBreedImages] = useState<BreedImage[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    const images = await api.getBreedImages({ breedId, page });
    setBreedImages(images);
    setIsLoading(false);
  }, [breedId, page]);

  useEffect(() => {
    // Reset when default option is selected
    if (breedId === '') {
      setBreedImages([]);
      setPage(1);
      return;
    }

    fetchImages();
  }, [breedId, fetchImages]);
  return (
    <CatBreedContext.Provider
      value={{ breedId, setBreedId, breedImages, setBreedImages, isLoading }}
    >
      {children}
    </CatBreedContext.Provider>
  );
};

const useCatBreed = () => {
  const context = useContext(CatBreedContext);

  if (!context) {
    throw new Error('useCatBreed must be used within a CatBreedProvider');
  }

  return context;
};

export { CatBreedProvider, useCatBreed };
