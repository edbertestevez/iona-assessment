import React, {
  ReactNode,
  useCallback,
  useContext,
  createContext,
  useState,
  useMemo,
} from 'react';

import api from '../../api';
import { BreedImage } from '../../types/Breed';

interface CatBreedContextProps {
  breedId: string;
  setBreed: (id: string) => void;
  breedImages: BreedImage[];
  setBreedImages: React.Dispatch<React.SetStateAction<BreedImage[]>>;
  hasBreedImages: boolean;
  isEndReached: boolean;
  isLoading: boolean;
  isRequested: boolean;
  getNextPage: () => void;
}

const CatBreedContext = createContext<CatBreedContextProps | undefined>(
  undefined,
);

const CatBreedProvider = ({ children }: { children: ReactNode }) => {
  const [breedId, setBreedId] = useState<string>('');
  const [breedImages, setBreedImages] = useState<BreedImage[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const [isEndReached, setIsEndReached] = useState<boolean>(false);

  const hasBreedImages = useMemo(() => breedImages.length > 0, [breedImages]);

  const fetchBreedImages = useCallback(
    async (currBreedId: string, currPage: number) => {
      setIsLoading(true);

      const images = await api.getBreedImages({
        breedId: currBreedId,
        page: currPage,
      });

      if (images.length === 0) {
        setIsEndReached(true);
      }

      setBreedImages((prevImages) => prevImages.concat(images));

      setIsLoading(false);
      setIsRequested(true);
    },
    [],
  );

  const getNextPage = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBreedImages(breedId, nextPage);
  }, [fetchBreedImages, page, breedId]);

  const setBreed = useCallback(
    (id: string) => {
      // Reset values on change
      setBreedId(id);
      setBreedImages([]);
      setPage(1);
      setIsEndReached(false);
      setIsRequested(false);

      if (id !== '') {
        fetchBreedImages(id, 1);
      }
    },
    [fetchBreedImages],
  );

  return (
    <CatBreedContext.Provider
      value={{
        breedId,
        setBreed,
        breedImages,
        setBreedImages,
        hasBreedImages,
        isEndReached,
        isLoading,
        isRequested,
        getNextPage,
      }}
    >
      {children}
    </CatBreedContext.Provider>
  );
};

const useCatBreedContext = () => {
  const context = useContext(CatBreedContext);

  if (!context) {
    throw new Error('useCatBreed must be used within a CatBreedProvider');
  }

  return context;
};

export { CatBreedProvider, useCatBreedContext };
